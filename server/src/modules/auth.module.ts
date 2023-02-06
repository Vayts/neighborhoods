import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { TokenModule } from './token.module';

@Module({
	providers: [AuthService],
	controllers: [AuthController],
	imports: [
		UserModule,
		TokenModule,
		JwtModule.register({})
	],
	exports: [
		AuthService,
		JwtModule,
	]
})
export class AuthModule {}
