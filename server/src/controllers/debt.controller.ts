import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { DebtService } from '../services/debt.service';
import { DebtorService } from '../services/debtor.service';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';
import { UserInNeighborhoodGuard } from '../guards/userInNeighborhood.guard';
import { Request } from 'express';
import { DebtAuthorGuard } from '../guards/debtAuthor.guard';
import { InvalidDataException } from '../exception/invalidData.exception';
import { ERRORS } from '../constants/errors';
import { DebtDto } from '../dto/debt.dto';
import { EditDebtDto } from '../dto/edit-debt.dto';

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
	
	@UseGuards(JwtAuthGuard)
	@Post('/:neighborhoodId/create_debt')
	createDebt(@Req() request: Request, @Body() body: DebtDto) {
		return this.debtorService.createDebt(request, body)
	}
	
	@UseGuards(JwtAuthGuard, DebtAuthorGuard)
	@Post('/close_debt/:debtId')
	closeUserDebt(@Req() request: Request) {
		return this.debtorService.closeDebt(request);
	}
	
	@UseGuards(JwtAuthGuard, DebtAuthorGuard)
	@Post('/reopen_debt/:debtId')
	reopenUserDebt(@Req() request: Request) {
		return this.debtorService.reopenDebt(request);
	}
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard, DebtAuthorGuard)
	@Post('/partial_payment/:neighborhoodId/:debtId')
	async addPartialPayment(@Req() request: Request) {
		const {debtId} = request.params;
		const {partialPaymentValue} = request.body;
		const debt = await this.debtService.getDebtByIdAndAuthor(debtId, request.user._id);
		
		if (debt.status || debt.value - partialPaymentValue < 1) {
			throw new InvalidDataException(ERRORS.NO_ACCESS)
		}
		
		return this.debtorService.addPartialPayment(request, debt);
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
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard, DebtAuthorGuard)
	@Post('/increase_debt/:neighborhoodId/:debtId')
	async increaseUserDebt(@Req() request: Request) {
		const {debtId} = request.params;
		const debt = await this.debtService.getDebtByIdAndAuthor(debtId, request.user._id);
		
		if (debt.status) {
			throw new InvalidDataException(ERRORS.NO_ACCESS)
		}
		
		return this.debtorService.increaseDebt(request, debt);
	}
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard, DebtAuthorGuard)
	@Delete('/delete_debt/:neighborhoodId/:debtId')
	async deleteDebt(@Req() request: Request) {
		const {debtId} = request.params;
		const debt = await this.debtService.getDebtByIdAndAuthor(debtId, request.user._id);
		return this.debtorService.deleteDebt(request, debt);
	}
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard, DebtAuthorGuard)
	@Post('/edit_debt/:neighborhoodId/:debtId')
	async editDebt(@Req() request: Request, @Body() editValues: EditDebtDto) {
		return this.debtorService.editDebt(request, editValues);
	}
}
