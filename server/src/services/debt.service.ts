import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Neighborhood, NeighborhoodDocument } from '../schemas/neighborhood.schema';
import { Neighborhood_UserDocument, Neighborhood_Users } from '../schemas/neighborhood_user.schema';
import { Debt, DebtDocument } from '../schemas/debt.schema';
import { parseDebtAuthorQuery, parseDebtStatusQuery } from '../helpers/debtQuery.helper';

@Injectable()
export class DebtService {
	constructor(
		@InjectModel(Neighborhood.name) private neighborhoodModel: Model<NeighborhoodDocument>,
		@InjectModel(Neighborhood_Users.name) private neighborhood_UserModel: Model<Neighborhood_UserDocument>,
		@InjectModel(Debt.name) private debtModel: Model<DebtDocument>,
	) {}
	
	getUserDebtsInNeighborhood(req) {
		const id = req.params.id;
		const authors = parseDebtAuthorQuery(req.query);
		const status = parseDebtStatusQuery(req.query);
		
		return this.debtModel.aggregate(
			[
				{$match: {debtor: new mongoose.Types.ObjectId(req.user._id), neighborhood: new mongoose.Types.ObjectId(id)}},
				{$match: {author: authors.length ? {'$in': [...authors]} : {$exists: true}}},
				{$match: {status: status.length ? {'$in': [...status]} : {'$in': [false]}}},
				{$match: {value: req.query.min ? { $gt: Number(req.query.min)} : {$exists: true}}},
				{$match: {value: req.query.max ? { $lt: Number(req.query.max)} : {$exists: true}}},
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
}
