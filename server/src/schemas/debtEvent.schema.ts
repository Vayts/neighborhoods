import { Prop, Schema } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Debt } from './debt.schema';

@Schema({_id: false, versionKey: false})
export class DebtEventSchema {
	@Prop({default: null})
	value: number
	
	@Prop()
	message: string;
	
	@Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Debt' })
	debt: Debt;
}
