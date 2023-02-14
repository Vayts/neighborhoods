import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from './token.module';
import { UserService } from '../services/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';

@Module({
	providers: [AuthService, UserService],
	controllers: [AuthController],
	imports: [
		MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
		TokenModule,
		JwtModule.register({})
	],
	exports: [
		AuthService,
		JwtModule,
	]
})
export class AuthModule {}
