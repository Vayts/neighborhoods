import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	_id?: string;

	@Prop()
	firstName: string;
	
	@Prop()
	lastName: string;
	
	@Prop()
	login: string;
	
	@Prop()
	password: string;
	
	@Prop({required: false})
	avatar: string;
	
}


export const UserSchema = SchemaFactory.createForClass(User);
