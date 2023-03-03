import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { DebtEventSchema } from './debtEvent.schema';
import { Neighborhood } from './neighborhood.schema';
import { DutyEventSchema } from './dutyEvent.schema';

export type UserEventDocument = HydratedDocument<UserEvent>;

@Schema()
export class UserEvent {
	_id?: string;
	@Prop()
	type: string;
	
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
	author: User;
	
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
	recipient: User;
	
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Neighborhood', default: null })
	neighborhood: Neighborhood;
	
	@Prop({type: Object})
	content: DutyEventSchema | DebtEventSchema;
	
	@Prop({default: false})
	hasSeen: boolean;
	
	@Prop({default: Date.now()})
	timeStamp: Date;
}


export const UserEventSchema = SchemaFactory.createForClass(UserEvent);
