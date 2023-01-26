import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs'
import { UserDocument } from '../schemas/user.schema';
import { TokenService } from './token.service';
import { ERRORS } from '../../constants/errors';

@Injectable()
export class AuthService {
	
	constructor(
		private userService: UserService,
		private jwtService: JwtService,
		private tokenService: TokenService,
	) {
	}
	
	
	async login(res, dto) {
		const user = await this.validateUser(dto);
		console.log(user);
		const tokens = this.tokenService.generateTokens(user);
		await this.tokenService.setToken(user._id, tokens.refresh);
		res.cookie('arvalesa', tokens.refresh, {httpOnly: true});
		return tokens.access;
	}
	
	async register(candidate) {
		const isExist = await this.userService.getUserByLogin(candidate.login);
		if (isExist) throw new HttpException('USER_ALREADY_EXIST', HttpStatus.BAD_REQUEST);
		const hashPassword = await bcrypt.hash(candidate.password, 10);
		const user: UserDocument[] = await this.userService.createUser({...candidate, password: hashPassword});
		const tokens = this.tokenService.generateTokens(user[0])
		await this.tokenService.setToken(user[0]._id, tokens.refresh);
		return tokens.access;
	}
	
	async validateUser(dto) {
		const user: UserDocument = await this.userService.getUserByLogin(dto.login);
		const isPasswordCorrect = await bcrypt.compare(dto.password, user.password);
		
		if (user && isPasswordCorrect) {
			return user;
		}
		throw new UnauthorizedException({message: 'WRONG_LOGIN_PASSWORD'});
	}
	
	async logout() {
		return null
	}
	
	async refresh(req) {
		const jwtToken = req.cookies.arvalesa;
		if (!jwtToken) throw new HttpException(ERRORS.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);

		const tokenCheck = await this.tokenService.getTokenByToken(jwtToken);
		if (!tokenCheck) throw new HttpException(ERRORS.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);

		try {
			const user: UserDocument | null = this.jwtService.verify(jwtToken);
			const newTokens = this.tokenService.generateTokens(user);

			if (user._id !== tokenCheck.user_id.toString()) {
				return Promise.reject('UNAUTHORIZED');
			}

			return {...user, token: newTokens.access}
		} catch (e) {
			throw new HttpException(ERRORS.NOT_AUTHORIZED, HttpStatus.UNAUTHORIZED);
		}
	}
}
