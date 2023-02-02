import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Neighborhood, NeighborhoodDocument } from '../schemas/neighborhood.schema';
import { Neighborhood_UserDocument, Neighborhood_Users } from '../schemas/neighborhood_user.schema';
import { Debt, DebtDocument } from '../schemas/debt.schema';

@Injectable()
export class DebtService {
	constructor(
		@InjectModel(Neighborhood.name) private neighborhoodModel: Model<NeighborhoodDocument>,
		@InjectModel(Neighborhood_Users.name) private neighborhood_UserModel: Model<Neighborhood_UserDocument>,
		@InjectModel(Debt.name) private debtModel: Model<DebtDocument>,
	) {
	}
	
	getUserDebtsInNeighborhood(req) {
		const id = req.params.id;
		
		return this.debtModel.aggregate(
			[
				{$match: {debtor: new mongoose.Types.ObjectId(req.user._id), neighborhood: new mongoose.Types.ObjectId(id)}},
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
				}
			]
		)
	}
}
