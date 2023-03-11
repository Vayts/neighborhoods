import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEvent, UserEventDocument } from '../../schemas/userEvent.schema';
import mongoose, { Model } from 'mongoose';
import { Duty, DutyDocument } from '../../schemas/duty.schema';
import { generateMarksForDuties } from '../../helpers/duty.helper';
import { DutyRequestDto } from '../../dto/dutyRequest.dto';
import { DutyMarkDto } from '../../dto/dutyMark.dto';

@Injectable()
export class DutyService {
	constructor(
		@InjectModel(UserEvent.name) private eventModel: Model<UserEventDocument>,
		@InjectModel(Duty.name) private dutyModel: Model<DutyDocument>,
	) {}
	
	async getUserDuties(req) {
		const user = req.user;
		const result = await this.dutyModel.aggregate([
			{
				$match: { members: { '$in': [new mongoose.Types.ObjectId(user._id)] } }
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
				$project: {
					members: {
						password: 0,
						__v: 0,
					},
				}
			}
		])
		return generateMarksForDuties(result);
	}
	
	getDutyByMemberIdAndDutyId(userId, dutyId) {
		return this.dutyModel.findOne({
			_id: dutyId,
			members: {'$in': [new mongoose.Types.ObjectId(userId)]}
		})
	}
	
	async getDutyById(_id) {
		const result = await this.dutyModel.aggregate([
			{
				$match: { _id: new mongoose.Types.ObjectId(_id)}
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
				$project: {
					members: {
						password: 0,
						__v: 0,
					},
				}
			}
		])
		return generateMarksForDuties(result);
	}
	
	async addMarkToDuty(req, dto: DutyMarkDto) {
		const {dutyId, neighborhoodId} = req.params;
		const response = await this.eventModel.insertMany({
			type: 'dutyMark',
			author: new mongoose.Types.ObjectId( req.user._id),
			recipient: null,
			neighborhood: new mongoose.Types.ObjectId(neighborhoodId),
			timeStamp: Date.now(),
			content: {
				duty: new mongoose.Types.ObjectId(dutyId),
				priority: 1,
				date: dto.date,
			}
		});
		if (response) {
			const result = await this.getDutyById(dutyId);
			return result[0];
		}
	}
	
	async addRequestToDuty(req, dto: DutyRequestDto) {
		const {dutyId, neighborhoodId} = req.params;
		await this.eventModel.insertMany({
			type: 'dutyRequest',
			author: new mongoose.Types.ObjectId( req.user._id),
			recipient: dto.recipient ? new mongoose.Types.ObjectId(dto.recipient) : null,
			neighborhood: new mongoose.Types.ObjectId(neighborhoodId),
			timeStamp: Date.now(),
			content: {
				duty: new mongoose.Types.ObjectId(dutyId),
				priority: 2,
				date: dto.date,
			}
		});
		const result = await this.getDutyById(dutyId);
		return result[0];
	}
}
