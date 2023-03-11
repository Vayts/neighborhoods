import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Duty } from './duty.schema';

@Schema({_id: false, versionKey: false})
export class DutyEventSchema {
	
	@Prop()
	date: Date;
	
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Duty' })
	duty: Duty;
	
	@Prop()
	priority: number;
}
