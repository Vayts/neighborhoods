import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '../modules/user.module';
import { AuthModule } from '../modules/auth.module';
import { NeighborhoodModule } from '../modules/neighborhood.module';

@Module({
  controllers: [AppController],
	providers: [AppService],
	imports: [
		MongooseModule.forRoot('mongodb+srv://admin:admin@users.fdv5b.mongodb.net/neighborhood'),
		UserModule,
		AuthModule,
		NeighborhoodModule
	]
})
export class AppModule {}
