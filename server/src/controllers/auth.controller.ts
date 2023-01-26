import { Body, Controller, Get, Post, Req, Res, UsePipes } from '@nestjs/common';
import { LoginUserDto } from '../dto/login-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
import { AuthService } from '../services/auth.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
	
	constructor(private authService: AuthService) {
	}
	
	@Post('/login')
	login(@Res({ passthrough: true }) response: Response, @Body() dto: LoginUserDto) {
		return this.authService.login(response, dto);
	}
	@UsePipes(ValidationPipe)
	@Post('/register')
	register(@Body() dto: CreateUserDto) {
		return this.authService.register(dto);
	}
	@Get('/refresh')
	refresh(@Req() request: Request) {
		return this.authService.refresh(request);
	}
	@Get('/logout')
	logout() {
		return this.authService.logout();
	}
	
}
