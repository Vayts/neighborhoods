import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Neighborhood, NeighborhoodDocument } from '../schemas/neighborhood.schema';
import mongoose, { Model } from 'mongoose';
import { Neighborhood_UserDocument, Neighborhood_Users } from '../schemas/neighborhood_user.schema';
import { Debt, DebtDocument } from '../schemas/debt.schema';
import { parseDebtDebtorsQuery, parseDebtStatusQuery } from '../helpers/debtQuery.helper';
import { UserEvent, UserEventDocument } from '../schemas/userEvent.schema';

@Injectable()
export class DebtorService {
	constructor(
		@InjectModel(Neighborhood.name) private neighborhoodModel: Model<NeighborhoodDocument>,
		@InjectModel(Neighborhood_Users.name) private neighborhood_UserModel: Model<Neighborhood_UserDocument>,
		@InjectModel(Debt.name) private debtModel: Model<DebtDocument>,
		@InjectModel(UserEvent.name) private eventModel: Model<UserEventDocument>,
	) {}
	
	getUserDebtorsInNeighborhood(req) {
		const {neighborhoodId} = req.params;
		const debtors = parseDebtDebtorsQuery(req.query);
		const status = parseDebtStatusQuery(req.query);

		return this.debtModel.aggregate(
			[
				{$match: {author: new mongoose.Types.ObjectId(req.user._id), neighborhood: new mongoose.Types.ObjectId(neighborhoodId)}},
				{$match: {debtor: debtors.length ? {'$in': [...debtors]} : {$exists: true}}},
				{$match: {status: status.length ? {'$in': [...status]} : {'$in': [false]}}},
				{$match: {value: req.query.min ? {$gt: Number(req.query.min)} : {$exists: true}}},
				{$match: {value: req.query.max ? {$lt: Number(req.query.max)} : {$exists: true}}},
				{
					$lookup: {
						from: "users",
						localField: "debtor",
						foreignField: "_id",
						as: "debtor"
					}
				},
				{$unwind: "$debtor"},
				{
					$project: {
						debtor: {
							password: 0
						}
					}
				},
				{$sort: {creationDate: -1}},
			]
		);

	}
	
	async closeDebt(req) {
		const {debtId} = req.params;
		const user = req.user;
		const debt = await this.debtModel.findOneAndUpdate({_id: debtId}, {status: true});
		const event = await this.eventModel.insertMany([
			{
				type: 'debt',
				content: {
					debt: debtId,
					message: 'debtWasClosed',
					value: debt.value,
				},
				author: new mongoose.Types.ObjectId(user._id),
				recipient: debt.debtor,
				neighborhood: debt.neighborhood,
				hasSeen: false,
			}
		])
		if (event) {
			return debt;
		}
	}
	
	async reopenDebt(req) {
		const {debtId} = req.params;
		const user = req.user;
		const debt = await this.debtModel.findOneAndUpdate({_id: debtId}, {status: false});
		const event = await this.eventModel.insertMany([
			{
				type: 'debt',
				content: {
					debt: debtId,
					message: 'debtWasReopened',
					value: debt.value,
				},
				author: new mongoose.Types.ObjectId(user._id),
				recipient: debt.debtor,
				neighborhood: debt.neighborhood,
				hasSeen: false,
			}
		])
		if (event) {
			return debt;
		}
	}
	
	createDebt(req, debt) {
		const {_id} = req.user;
		const {neighborhoodId} = req.params;
		return this.debtModel.insertMany([{
			...debt,
			author: new mongoose.Types.ObjectId(_id),
			neighborhood: new mongoose.Types.ObjectId(neighborhoodId),
			debtor: new mongoose.Types.ObjectId(debt.debtor),
			status: false,
			creationDate: Date.now(),
			initialValue: debt.value,
			value: debt.value,
		}])
	}
	
	editDebt(req, values) {
		const {debtId} = req.params;
		return this.debtModel.findOneAndUpdate({_id: debtId}, {...values}, {returnOriginal: false})
	}
	
	async deleteDebt(req, debt) {
		const {debtId} = req.params;
		const deleteFromEvents = await this.eventModel.deleteMany({
			type: 'debt',
			'content.debt': new mongoose.Types.ObjectId(debtId)
		});
		const deleteFromDebts = await this.debtModel.deleteOne({
			_id: new mongoose.Types.ObjectId(debtId)
		})
		if (deleteFromEvents && deleteFromDebts) {
			return debt;
		}
	}
	
	async addPartialPayment(req, debt) {
		
		const {debtId, neighborhoodId} = req.params;
		const {partialPaymentValue} = req.body;
		const {_id} = req.user;
		
		const event = await this.eventModel.insertMany([
			{
				type: 'debt',
				content: {
					debt: debtId,
					message: 'partialReturn',
					value: Number(partialPaymentValue.toFixed(2)),
				},
				author: new mongoose.Types.ObjectId(_id),
				recipient: new mongoose.Types.ObjectId(debt.debtor),
				neighborhood: new mongoose.Types.ObjectId(neighborhoodId),
				hasSeen: false,
			}
		])
		if (event) {
			return this.debtModel.findOneAndUpdate({_id: debtId}, {value: Number((debt.value - Number(partialPaymentValue)).toFixed(2))}, { returnOriginal: false },)
		}
	}
	
	async reduceDebt(req, debt) {
		
		const {debtId, neighborhoodId} = req.params;
		const {reduceValue} = req.body;
		const {_id} = req.user;
		
		const event = await this.eventModel.insertMany([
			{
				type: 'debt',
				content: {
					debt: debtId,
					message: 'reduceDebt',
					value: Number(reduceValue.toFixed(2)),
				},
				author: new mongoose.Types.ObjectId(_id),
				recipient: new mongoose.Types.ObjectId(debt.debtor),
				neighborhood: new mongoose.Types.ObjectId(neighborhoodId),
				hasSeen: false,
			}
		])
		if (event) {
			return this.debtModel.findOneAndUpdate(
				{_id: debtId},
				{
					value: Number((debt.value - Number(reduceValue)).toFixed(2)),
					initialValue: Number((debt.initialValue - Number(reduceValue)).toFixed(2))
				},
				{ returnOriginal: false },)
		}
	}
	
	async increaseDebt(req, debt) {
		const {debtId, neighborhoodId} = req.params;
		const {increaseValue} = req.body;
		const {_id} = req.user;
		
		const event = await this.eventModel.insertMany([
			{
				type: 'debt',
				content: {
					debt: debtId,
					message: 'increaseDebt',
					value: Number(increaseValue.toFixed(2)),
				},
				author: new mongoose.Types.ObjectId(_id),
				recipient: new mongoose.Types.ObjectId(debt.debtor),
				neighborhood: new mongoose.Types.ObjectId(neighborhoodId),
				hasSeen: false,
			}
		])
		if (event) {
			return this.debtModel.findOneAndUpdate(
				{_id: debtId},
				{
					value: Number((debt.value + Number(increaseValue)).toFixed(2)),
					initialValue: Number((debt.initialValue + Number(increaseValue)).toFixed(2))
				},
				{ returnOriginal: false },)
		}
	}
}
