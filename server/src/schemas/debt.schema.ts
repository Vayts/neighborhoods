import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Neighborhood } from './neighborhood.schema';

export type DebtDocument = HydratedDocument<Debt>;

@Schema()
export class Debt {
	_id?: string;
	
	@Prop()
	title: string;
	
	@Prop({required: false, default: null})
	description: string | null;
	
	@Prop()
	initialValue: number;
	
	@Prop()
	value: number;
	
	@Prop({type: Date, default: Date.now()})
	creationDate: Date;
	
	@Prop({type: Date})
	expDate: Date;
	
	@Prop({type: Date, default: null})
	closeDate: Date | null;
	
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	author: User;
	
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
	debtor: User;
	
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Neighborhood' })
	neighborhood: Neighborhood;
	
	@Prop({required: false, default: null})
	photo: string | null;
	
	@Prop({default: false})
	status: boolean;
}


export const DebtSchema = SchemaFactory.createForClass(Debt);
