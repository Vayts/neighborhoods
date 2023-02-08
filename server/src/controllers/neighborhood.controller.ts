import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';
import { NeighborhoodService } from '../services/neighborhood.service';
import { Request } from 'express';
import { DebtService } from '../services/debt.service';
import { isUserInNeighborhood } from '../guards/isUserInNeighborhood.guard';
import { DebtorService } from '../services/debtor.service';

@Controller('neighborhood')
export class NeighborhoodController {
	
	constructor(
		private neighborhoodService: NeighborhoodService,
		private debtService: DebtService,
		private debtorService: DebtorService,
	) {}
	@UseGuards(JwtAuthGuard)
	@Get('/user_neighborhoods')
	getNeighborhoodsByUser(@Req() request: Request) {
		return this.neighborhoodService.getNeighborhoodsByUser(request);
	}
	
	@UseGuards(JwtAuthGuard, isUserInNeighborhood)
	@Get('/debts/:id')
	getUserDebtsInNeighborhood(@Req() request: Request) {
		return this.debtService.getUserDebtsInNeighborhood(request);
	}
	
	@UseGuards(JwtAuthGuard, isUserInNeighborhood)
	@Get('/debtors/:id')
	getUserDebtorsInNeighborhood(@Req() request: Request) {
		return this.debtorService.getUserDebtorsInNeighborhood(request);
	}
	
	@UseGuards(JwtAuthGuard, isUserInNeighborhood)
	@Get('/:id')
	getUserNeighborhood(@Req() request: Request) {
		return this.neighborhoodService.getUserNeighborhood(request);
	}
	
}
