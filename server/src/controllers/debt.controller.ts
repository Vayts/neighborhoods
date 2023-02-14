import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { DebtService } from '../services/debt.service';
import { DebtorService } from '../services/debtor.service';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';
import { UserInNeighborhoodGuard } from '../guards/userInNeighborhood.guard';
import { Request } from 'express';
import { DebtValidateGuard } from '../guards/debtValidate.guard';
import { DebtAuthorGuard } from '../guards/debtAuthor.guard';
import { InvalidDataException } from '../exception/invalidData.exception';
import { ERRORS } from '../constants/errors';

@Controller('debt')
export class DebtController {
	constructor(
		private debtService: DebtService,
		private debtorService: DebtorService,
	) {}
	
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard)
	@Get('/debts/:neighborhoodId')
	getUserDebtsInNeighborhood(@Req() request: Request) {
		return this.debtService.getUserDebtsInNeighborhood(request);
	}
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard)
	@Get('/debtors/:neighborhoodId')
	getUserDebtorsInNeighborhood(@Req() request: Request) {
		return this.debtorService.getUserDebtorsInNeighborhood(request);
	}
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard)
	@Get('/history/:neighborhoodId/:debtId')
	getDebtHistory(@Req() request: Request) {
		return this.debtService.getDebtHistory(request);
	}
	
	@UseGuards(JwtAuthGuard, DebtValidateGuard)
	@Post('/:neighborhoodId/create_debt')
	createDebt(@Req() request: Request) {
		return this.debtorService.createDebt(request)
	}
	
	@UseGuards(JwtAuthGuard, DebtAuthorGuard)
	@Get('/close_debt/:debtId')
	closeUserDebt(@Req() request: Request) {
		return this.debtorService.closeDebt(request);
	}
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard, DebtAuthorGuard)
	@Post('/reduce_debt/:neighborhoodId/:debtId')
	async reduceUserDebt(@Req() request: Request) {
		const {debtId} = request.params;
		const {reduceValue} = request.body;
		const debt = await this.debtService.getDebtByIdAndAuthor(debtId, request.user._id);
		
		if (debt.status || debt.value - reduceValue < 1) {
			throw new InvalidDataException(ERRORS.NO_ACCESS)
		}
		
		return this.debtorService.reduceDebt(request, debt);
	}
}
