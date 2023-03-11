import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Neighborhood, NeighborhoodDocument } from '../../schemas/neighborhood.schema';
import { Neighborhood_UserDocument, Neighborhood_Users } from '../../schemas/neighborhood_user.schema';
import { InvalidDataException } from '../../exception/invalidData.exception';
import { ERRORS } from '../../constants/errors';

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
	
	async getUserInNeighborhood(req, id) {
		return this.neighborhood_UserModel.findOne({
			neighborhood_id: id,
			user_id: req.user._id,
		});
	}
	
	async getUserNeighborhood(req) {
		const { neighborhoodId } = req.params;

		const result = await this.neighborhoodModel.aggregate([
			{$match: {_id: new mongoose.Types.ObjectId(neighborhoodId) }},
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
					as: "users"
				}
			},
			{
				$project: {
					usersInNeighborhoods: 0,
					users: {
						password: 0,
					},
				}
			}
		])
		if (result.length) {
			return result;
		}
		throw new InvalidDataException(ERRORS.INVALID_DATA);
	}
}
