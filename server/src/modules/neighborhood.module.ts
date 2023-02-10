import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Neighborhood, NeighborhoodSchema } from '../schemas/neighborhood.schema';
import { NeighborhoodService } from '../services/neighborhood.service';
import { NeighborhoodController } from '../controllers/neighborhood.controller';
import {
	Neighborhood_Users,
	Neighborhood_UserSchema,
} from '../schemas/neighborhood_user.schema';
import { JwtModule } from '@nestjs/jwt';
import { DebtService } from '../services/debt.service';
import { Debt, DebtSchema } from '../schemas/debt.schema';
import { DebtorService } from '../services/debtor.service';

@Module({
	controllers: [NeighborhoodController],
	providers: [NeighborhoodService, DebtService, DebtorService],
	imports: [
		JwtModule,
		MongooseModule.forFeature([
			{name: Neighborhood.name, schema: NeighborhoodSchema},
			{name: Neighborhood_Users.name, schema: Neighborhood_UserSchema},
			{name: Debt.name, schema: DebtSchema}
		]),
		NeighborhoodModule,
	],
	exports: [
		NeighborhoodService,
		DebtService,
	]
})
export class NeighborhoodModule {}
