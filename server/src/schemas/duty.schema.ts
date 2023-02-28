import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Neighborhood } from './neighborhood.schema';

export type DutyDocument = HydratedDocument<Duty>;

@Schema()
export class Duty {
	_id?: string;
	
	@Prop()
	title: string;
	
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	author: User;
	
	@Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'User' })
	members: User[];
	
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Neighborhood' })
	neighborhood: Neighborhood;
	
	@Prop({default: false})
	active: boolean;
}


export const DutySchema = SchemaFactory.createForClass(Duty);
