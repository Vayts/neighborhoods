import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NeighborhoodDocument = HydratedDocument<Neighborhood>;

@Schema()
export class Neighborhood {
	_id?: string;
	@Prop()
	title: string;
	@Prop()
	description: string;
	@Prop()
	type: string;
	@Prop()
	creationDate: Date;
}


export const NeighborhoodSchema = SchemaFactory.createForClass(Neighborhood);
