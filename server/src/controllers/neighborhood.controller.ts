import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';
import { NeighborhoodService } from '../services/neighborhood.service';
import { Request } from 'express';

@Controller('neighborhood')
export class NeighborhoodController {
	
	constructor(private neighborhoodService: NeighborhoodService) {}
	@UseGuards(JwtAuthGuard)
	@Get('/user_neighborhoods')
	getNeighborhoodsByUser(@Req() request: Request) {
		return this.neighborhoodService.getNeighborhoodsByUser(request);
	}
	
}
