import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Neighborhood, NeighborhoodDocument } from '../schemas/neighborhood.schema';
import mongoose, { Model } from 'mongoose';
import { Neighborhood_UserDocument, Neighborhood_Users } from '../schemas/neighborhood_user.schema';
import { Debt, DebtDocument } from '../schemas/debt.schema';
import { parseDebtDebtorsQuery, parseDebtStatusQuery } from '../helpers/debtQuery.helper';
import { UserEvent, UserEventDocument } from '../schemas/userEvent.schema';
import { InvalidDataException } from '../exception/invalidData.exception';
import { ERRORS } from '../constants/errors';

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
	
	closeDebt(req) {
		const {debtId} = req.params;
		return this.debtModel.findOneAndUpdate({_id: debtId}, {status: true})
	}
	
	createDebt(req) {
		const {_id} = req.user;
		const {neighborhoodId} = req.params;
		const values = req.body;
		return this.debtModel.insertMany([{
			author: new mongoose.Types.ObjectId(_id),
			neighborhood: new mongoose.Types.ObjectId(neighborhoodId),
			debtor: new mongoose.Types.ObjectId(values.debtor),
			status: false,
			creationDate: Date.now(),
			initialValue: values.value,
			...values,
		}])
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
					message: 'partialReturn',
					value: reduceValue,
				},
				author: new mongoose.Types.ObjectId(_id),
				recipient: new mongoose.Types.ObjectId(debt.debtor),
				neighborhood: new mongoose.Types.ObjectId(neighborhoodId),
				hasSeen: false,
			}
		])
		if (event) {
			return this.debtModel.findOneAndUpdate({_id: debtId}, {value: debt.value - Number(reduceValue)}, { returnOriginal: false },)
		}
	}
}
