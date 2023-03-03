import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEvent, UserEventDocument } from '../schemas/userEvent.schema';
import mongoose, { Model } from 'mongoose';
import { Duty, DutyDocument } from '../schemas/duty.schema';

@Injectable()
export class DutyService {
	constructor(
		@InjectModel(UserEvent.name) private eventModel: Model<UserEventDocument>,
		@InjectModel(Duty.name) private dutyModel: Model<DutyDocument>,
	) {}
	
	getUserDuties(req) {
		const user = req.user;
		// this.eventModel.insertMany({
		// 	type: 'dutyMark',
		// 	author: new mongoose.Types.ObjectId( '63d32ea8348b82b2d6109d0d'),
		// 	recipient: null,
		// 	neighborhood: new mongoose.Types.ObjectId('63d5e4f18ac5a4b76978d8b3'),
		// 	timeStamp: Date.now(),
		// 	content: {
		// 		duty: new mongoose.Types.ObjectId('640099a82eb961de26339d27'),
		// 	}
		// });
		return this.dutyModel.aggregate([
			{
				$match: {members: {'$in': [new mongoose.Types.ObjectId(user._id)]}}
			},
			{
				$lookup: {
					from: "users",
					localField: "members",
					foreignField: "_id",
					as: "members"
				}
			},
			{
				$lookup: {
					from: "userevents",
					localField: "_id",
					foreignField: "content.duty",
					as: "marks"
				}
			},
			{
				$lookup: {
					from: "users",
					localField: "marks.author",
					foreignField: "_id",
					as: "test"
				}
			},
			// {
			// 	$lookup: {
			// 		from: "users",
			// 		localField: "marks.author",
			// 		foreignField: "_id",
			// 		as: "marks.test"
			// 	}
			// },
			{
				$project: {
					members: {
						password: 0,
						__v: 0,
					},
				}
			}
		])
	}
}
