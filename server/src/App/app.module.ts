import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../modules/auth.module';
import { NeighborhoodModule } from '../modules/neighborhood.module';
import { DebtModule } from '../modules/debt.module';

@Module({
  controllers: [AppController],
	providers: [AppService],
	imports: [
		MongooseModule.forRoot('mongodb+srv://admin:admin@users.fdv5b.mongodb.net/neighborhood'),
		AuthModule,
		NeighborhoodModule,
		DebtModule,
	]
})
export class AppModule {}
