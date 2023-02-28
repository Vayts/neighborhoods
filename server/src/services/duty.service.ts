import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UserEvent, UserEventDocument } from '../schemas/userEvent.schema';
import { Model } from 'mongoose';
import { Duty, DutyDocument } from '../schemas/duty.schema';

@Injectable()
export class DutyService {
	constructor(
		@InjectModel(UserEvent.name) private eventModel: Model<UserEventDocument>,
		@InjectModel(Duty.name) private dutyModel: Model<DutyDocument>,
	) {}
	
	getUserDuties() {
		return [1,2,3];
	}
}
