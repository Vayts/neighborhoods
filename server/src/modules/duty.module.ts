import { Module } from '@nestjs/common';
import { DutyController } from '../controllers/duty.controller';
import { DutyService } from '../services/duty.service';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { Duty, DutySchema } from '../schemas/duty.schema';
import { UserEvent, UserEventSchema } from '../schemas/userEvent.schema';

@Module({
	controllers: [DutyController],
	providers: [DutyService],
	imports: [
		JwtModule,
		MongooseModule.forFeature([
			{name: Duty.name, schema: DutySchema},
			{name: UserEvent.name, schema: UserEventSchema},
		])
	]
})
export class DutyModule {}
