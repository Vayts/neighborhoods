import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from '../token/token.module';
import { UserService } from '../user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../schemas/user.schema';

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
