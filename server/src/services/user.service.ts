import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../schemas/user.schema';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
	
	createUser(dto: CreateUserDto): Promise<UserDocument[]>{
		return this.userModel.insertMany([{...dto, avatar: null}]);
	}
	
	async getUserByLogin(login: string): Promise<UserDocument | null> {
		const user = await this.userModel.findOne({login});
		return user;
	}
}
