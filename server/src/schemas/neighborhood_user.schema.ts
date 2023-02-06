import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema'
import { Neighborhood } from './neighborhood.schema';

export type Neighborhood_UserDocument = HydratedDocument<Neighborhood_Users>;

@Schema()
export class Neighborhood_Users {
	_id?: string;
	
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	user_id: User;
	
	@Prop()
	role: string;
	
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Neighborhood' })
	neighborhood_id: Neighborhood;
	
	
}


export const Neighborhood_UserSchema = SchemaFactory.createForClass(Neighborhood_Users);
