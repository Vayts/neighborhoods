import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';
import { NeighborhoodService } from '../services/neighborhood.service';
import { Request } from 'express';
import { DebtService } from '../services/debt.service';
import { DebtorService } from '../services/debtor.service';
import { DebtAuthorGuard } from '../guards/debtAuthor.guard';
import { UserInNeighborhoodGuard } from '../guards/UserInNeighborhood.guard';
import { DebtValidateGuard } from '../guards/debtValidate.guard';

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
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard)
	@Get('/debts/:id')
	getUserDebtsInNeighborhood(@Req() request: Request) {
		return this.debtService.getUserDebtsInNeighborhood(request);
	}
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard)
	@Get('/debtors/:id')
	getUserDebtorsInNeighborhood(@Req() request: Request) {
		return this.debtorService.getUserDebtorsInNeighborhood(request);
	}
	
	@UseGuards(JwtAuthGuard, DebtAuthorGuard)
	@Get('/close_debt/:id')
	closeUserDebt(@Req() request: Request) {
		return this.debtorService.closeDebt(request);
	}
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard)
	@Get('/:id')
	getUserNeighborhood(@Req() request: Request) {
		return this.neighborhoodService.getUserNeighborhood(request);
	}
	
	@UseGuards(JwtAuthGuard, DebtValidateGuard)
	@Post('/:id/create_debt')
	createDebt(@Req() request: Request) {
		return this.debtorService.createDebt(request)
	}
	
}
