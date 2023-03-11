import { Module } from '@nestjs/common';
import { DutyController } from './duty.controller';
import { DutyService } from './duty.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Duty, DutySchema } from '../../schemas/duty.schema';
import { UserEvent, UserEventSchema } from '../../schemas/userEvent.schema';
import { NeighborhoodService } from '../neighborhood/neighborhood.service';
import { Neighborhood, NeighborhoodSchema } from '../../schemas/neighborhood.schema';
import { Neighborhood_Users, Neighborhood_UserSchema } from '../../schemas/neighborhood_user.schema';

@Module({
	controllers: [DutyController],
	providers: [DutyService, NeighborhoodService],
	imports: [
		JwtModule,
		MongooseModule.forFeature([
			{name: Duty.name, schema: DutySchema},
			{name: UserEvent.name, schema: UserEventSchema},
			{name: Neighborhood.name, schema: NeighborhoodSchema},
			{name: Neighborhood_Users.name, schema: Neighborhood_UserSchema}
		])
	]
})
export class DutyModule {}
