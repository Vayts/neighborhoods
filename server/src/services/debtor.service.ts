import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Neighborhood, NeighborhoodDocument } from '../schemas/neighborhood.schema';
import mongoose, { Model } from 'mongoose';
import { Neighborhood_UserDocument, Neighborhood_Users } from '../schemas/neighborhood_user.schema';
import { Debt, DebtDocument } from '../schemas/debt.schema';
import { parseDebtDebtorsQuery, parseDebtStatusQuery } from '../helpers/debtQuery.helper';

@Injectable()
export class DebtorService {
	constructor(
		@InjectModel(Neighborhood.name) private neighborhoodModel: Model<NeighborhoodDocument>,
		@InjectModel(Neighborhood_Users.name) private neighborhood_UserModel: Model<Neighborhood_UserDocument>,
		@InjectModel(Debt.name) private debtModel: Model<DebtDocument>,
	) {}
	
	getUserDebtorsInNeighborhood(req) {
		const id = req.params.id;
		const debtors = parseDebtDebtorsQuery(req.query);
		const status = parseDebtStatusQuery(req.query);

		return this.debtModel.aggregate(
			[
				{$match: {author: new mongoose.Types.ObjectId(req.user._id), neighborhood: new mongoose.Types.ObjectId(id)}},
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
		const id = req.params.id;
		return this.debtModel.findOneAndUpdate({_id: id}, {status: true})
	}
	
	createDebt(req) {
		const {_id} = req.user;
		const id = req.params.id;
		const values = req.body;
		return this.debtModel.insertMany([{
			author: new mongoose.Types.ObjectId(_id),
			neighborhood: new mongoose.Types.ObjectId(id),
			debtor: new mongoose.Types.ObjectId(values.debtor),
			status: false,
			creationDate: Date.now(),
			...values,
		}])
	}
}
