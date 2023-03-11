import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Neighborhood, NeighborhoodSchema } from '../../schemas/neighborhood.schema';
import {
	Neighborhood_Users,
	Neighborhood_UserSchema,
} from '../../schemas/neighborhood_user.schema';
import { JwtModule } from '@nestjs/jwt';
import { DebtService } from './debt.service';
import { Debt, DebtSchema } from '../../schemas/debt.schema';
import { DebtController } from './debt.controller';
import { NeighborhoodService } from '../neighborhood/neighborhood.service';
import { UserEvent, UserEventSchema } from '../../schemas/userEvent.schema';

@Module({
	controllers: [DebtController],
	providers: [DebtService, NeighborhoodService],
	imports: [
		JwtModule,
		MongooseModule.forFeature([
			{name: Neighborhood.name, schema: NeighborhoodSchema},
			{name: Neighborhood_Users.name, schema: Neighborhood_UserSchema},
			{name: Debt.name, schema: DebtSchema},
			{name: UserEvent.name, schema: UserEventSchema}
		]),
		DebtModule,
	],
	exports: [
		DebtService,
	]
})
export class DebtModule {}
