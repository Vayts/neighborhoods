import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';
import { NeighborhoodService } from '../services/neighborhood.service';
import { Request } from 'express';
import { UserInNeighborhoodGuard } from '../guards/UserInNeighborhood.guard';

@Controller('neighborhood')
export class NeighborhoodController {
	
	constructor(
		private neighborhoodService: NeighborhoodService,
	) {}
	@UseGuards(JwtAuthGuard)
	@Get('/user_neighborhoods')
	getNeighborhoodsByUser(@Req() request: Request) {
		return this.neighborhoodService.getNeighborhoodsByUser(request);
	}
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard)
	@Get('/:neighborhoodId')
	getUserNeighborhood(@Req() request: Request) {
		return this.neighborhoodService.getUserNeighborhood(request);
	}
	
}
