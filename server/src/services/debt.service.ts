import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Neighborhood, NeighborhoodDocument } from '../schemas/neighborhood.schema';
import { Neighborhood_UserDocument, Neighborhood_Users } from '../schemas/neighborhood_user.schema';
import { Debt, DebtDocument } from '../schemas/debt.schema';
import { parseDebtStatusQuery, parseDebtUsersQuery } from '../helpers/debtQuery.helper';
import { UserEvent, UserEventDocument } from '../schemas/userEvent.schema';

@Injectable()
export class DebtService {
	constructor(
		@InjectModel(Neighborhood.name) private neighborhoodModel: Model<NeighborhoodDocument>,
		@InjectModel(Neighborhood_Users.name) private neighborhood_UserModel: Model<Neighborhood_UserDocument>,
		@InjectModel(Debt.name) private debtModel: Model<DebtDocument>,
		@InjectModel(UserEvent.name) private eventModel: Model<UserEventDocument>,
	) {}
	
	getUserDebtsInNeighborhood(req) {
		const {neighborhoodId} = req.params;
		const authors = parseDebtUsersQuery(req.query);
		const status = parseDebtStatusQuery(req.query);
		
		return this.debtModel.aggregate(
			[
				{$match: {debtor: new mongoose.Types.ObjectId(req.user._id), neighborhood: new mongoose.Types.ObjectId(neighborhoodId)}},
				{$match: {author: authors.length ? {'$in': [...authors]} : {$exists: true}}},
				{$match: {status: status.length ? {'$in': [...status]} : {'$in': [false]}}},
				{$match: {value: req.query.min ? { $gt: Number(req.query.min) - 0.1} : {$exists: true}}},
				{$match: {value: req.query.max ? { $lt: Number(req.query.max) + 0.1}: {$exists: true}}},
				{
					$lookup: {
						from: "users",
						localField: "author",
						foreignField: "_id",
						as: "author"
					}
				},
				{ $unwind: "$author" },
				{
					$project: {
						author: {
							password: 0
						}
					}
				},
				{ $sort: { creationDate: -1 } },
			]
		)
	}
	
	getDebtByIdAndAuthor(id: string, author: string) {
		return this.debtModel.findOne({_id: id, author});
	}
	
	getDebtHistory(req) {
		const {debtId} = req.params;
		return this.eventModel.aggregate([
			{$match: {type: 'debt',  'content.debt': new mongoose.Types.ObjectId(debtId)}},
			{
				$lookup: {
					from: "users",
					localField: "author",
					foreignField: "_id",
					as: "author"
				}
			},
			{$unwind: "$author"},
			{
				$lookup: {
					from: "users",
					localField: "recipient",
					foreignField: "_id",
					as: "debtor"
				}
			},
			{$unwind: "$debtor"},
			{
				$lookup: {
					from: "debts",
					localField: "content.debt",
					foreignField: "_id",
					as: "debt"
				}
			},
			{$unwind: "$debt"},
			{
				$project: {
					author: {
						password: 0
					},
					debtor: {
						password: 0,
					}
				}
			},
		])
	}
}
