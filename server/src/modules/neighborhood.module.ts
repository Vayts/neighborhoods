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

@Module({
	controllers: [NeighborhoodController],
	providers: [NeighborhoodService],
	imports: [
		JwtModule,
		MongooseModule.forFeature([{name: Neighborhood.name, schema: NeighborhoodSchema}]),
		MongooseModule.forFeature([{name: Neighborhood_Users.name, schema: Neighborhood_UserSchema}]),
		NeighborhoodModule,
	],
})
export class NeighborhoodModule {}
