import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Neighborhood, NeighborhoodDocument } from '../schemas/neighborhood.schema';
import { Neighborhood_UserDocument, Neighborhood_Users } from '../schemas/neighborhood_user.schema';

@Injectable()
export class NeighborhoodService {
	constructor(
		@InjectModel(Neighborhood.name) private neighborhoodModel: Model<NeighborhoodDocument>,
		@InjectModel(Neighborhood_Users.name) private neighborhood_UserModel: Model<Neighborhood_UserDocument>
		
	) {
	}
	
	async getNeighborhoodsByUser(req) {
		
		return this.neighborhoodModel.aggregate([
			{
				$lookup: {
					from: "neighborhood_users",
					localField: "_id",
					foreignField: "neighborhood_id",
					as: "usersInNeighborhoods"
				}
			},
			{
				$lookup: {
					from: "users",
					localField: "usersInNeighborhoods.user_id",
					foreignField: "_id",
					as: "usersData"
				}
			},
			{
				$addFields: {
					'user_ids': "$usersInNeighborhoods.user_id",
				}
			},
			{$match: {user_ids: {'$in': [new mongoose.Types.ObjectId(req.user._id)]} } },
			{
				$addFields: {
					'users': "$usersData",
				}
			},
			{
				$project: {
					title: 1,
					description: 1,
					_id: 1,
					type: 1,
					neighborhoods: 1,
					users: 1,
				}
			}
		])
	}
}
