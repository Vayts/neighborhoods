import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../schemas/user.schema';
import { UserService } from '../services/user.service';

@Module({
	controllers: [],
	providers: [UserService],
	imports: [
		MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
		UserModule,
	],
	exports: [UserService]
})
export class UserModule {}
