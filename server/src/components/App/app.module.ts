import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { NeighborhoodModule } from '../neighborhood/neighborhood.module';
import { DebtModule } from '../debt/debt.module';
import { DutyModule } from '../duty/duty.module';

@Module({
  controllers: [AppController],
	providers: [AppService],
	imports: [
		MongooseModule.forRoot('mongodb+srv://admin:admin@users.fdv5b.mongodb.net/neighborhood'),
		AuthModule,
		NeighborhoodModule,
		DebtModule,
		DutyModule,
	]
})
export class AppModule {}
