import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Token, TokenDocument } from '../schemas/token.schema';
import { UserDocument } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenService {
	constructor(@InjectModel(Token.name) private tokenModel: Model<TokenDocument>, private jwtService: JwtService) {
	}
	
	 getTokenByUserId(user_id) {
		return this.tokenModel.findOne({user_id}).exec();
	}
	
	getTokenByToken(token): Promise<TokenDocument> {
		return this.tokenModel.findOne({token}).exec();
	}
	
	generateTokens(user: UserDocument) {
		const payload = {_id: user._id, login: user.login, firstName: user.firstName, lastName: user.lastName}
		return {
			access: this.jwtService.sign(payload, {
				'expiresIn': '60m',
				privateKey: process.env.JWT_ACCESS_SECRET || 'access'
			}),
			refresh: this.jwtService.sign(payload, {
				'expiresIn': '30d',
				privateKey: process.env.JWT_REFRESH_SECRET || 'refresh'
			})
		};
	}
	
	setToken(user_id, token) {
		return this.tokenModel.create({user_id, token});
	}
	
	updateToken(user_id, token) {
		return this.tokenModel.findOneAndUpdate({user_id}, {token});
	}
	
	refreshToken() {
	
	}
	
}
