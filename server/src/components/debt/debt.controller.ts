import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import { DebtService } from './debt.service';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';
import { UserInNeighborhoodGuard } from '../../guards/userInNeighborhood.guard';
import { Request } from 'express';
import { DebtAuthorGuard } from '../../guards/debtAuthor.guard';
import { InvalidDataException } from '../../exception/invalidData.exception';
import { ERRORS } from '../../constants/errors';
import { DebtDto } from '../../dto/debt.dto';
import { EditDebtDto } from '../../dto/edit-debt.dto';

@Controller('debt')
export class DebtController {
	constructor(
		private debtService: DebtService,
	) {}
	
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard)
	@Get('/debts/:neighborhoodId')
	getUserDebtsInNeighborhood(@Req() request: Request) {
		return this.debtService.getUserDebtsInNeighborhood(request);
	}
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard)
	@Get('/debtors/:neighborhoodId')
	getUserDebtorsInNeighborhood(@Req() request: Request) {
		return this.debtService.getUserDebtorsInNeighborhood(request);
	}
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard)
	@Get('/history/:neighborhoodId/:debtId')
	getDebtHistory(@Req() request: Request) {
		return this.debtService.getDebtHistory(request);
	}
	
	@UseGuards(JwtAuthGuard)
	@Post('/create_debt/:neighborhoodId')
	createDebt(@Req() request: Request, @Body() body: DebtDto) {
		return this.debtService.createDebt(request, body)
	}
	
	@UseGuards(JwtAuthGuard, DebtAuthorGuard)
	@Post('/close_debt/:debtId')
	closeUserDebt(@Req() request: Request) {
		return this.debtService.closeDebt(request);
	}
	
	@UseGuards(JwtAuthGuard, DebtAuthorGuard)
	@Post('/reopen_debt/:debtId')
	reopenUserDebt(@Req() request: Request) {
		return this.debtService.reopenDebt(request);
	}
	
	@UseGuards(JwtAuthGuard, DebtAuthorGuard)
	@Post('/partial_payment/:debtId')
	async addPartialPayment(@Req() request: Request) {
		const {debtId} = request.params;
		const {partialPaymentValue} = request.body;
		const debt = await this.debtService.getDebtByIdAndAuthor(debtId, request.user._id);
		
		if (debt.status || debt.value - partialPaymentValue < 1) {
			throw new InvalidDataException(ERRORS.NO_ACCESS)
		}
		
		return this.debtService.addPartialPayment(request, debt);
	}
	
	@UseGuards(JwtAuthGuard, DebtAuthorGuard)
	@Post('/reduce_debt/:debtId')
	async reduceUserDebt(@Req() request: Request) {
		const {debtId} = request.params;
		const {reduceValue} = request.body;
		const debt = await this.debtService.getDebtByIdAndAuthor(debtId, request.user._id);
		
		if (debt.status || debt.value - reduceValue < 1) {
			throw new InvalidDataException(ERRORS.NO_ACCESS)
		}
		
		return this.debtService.reduceDebt(request, debt);
	}
	
	@UseGuards(JwtAuthGuard, DebtAuthorGuard)
	@Post('/increase_debt/:debtId')
	async increaseUserDebt(@Req() request: Request) {
		const {debtId} = request.params;
		const debt = await this.debtService.getDebtByIdAndAuthor(debtId, request.user._id);
		
		if (debt.status) {
			throw new InvalidDataException(ERRORS.NO_ACCESS)
		}
		
		return this.debtService.increaseDebt(request, debt);
	}
	
	@UseGuards(JwtAuthGuard, DebtAuthorGuard)
	@Delete('/delete_debt/:debtId')
	async deleteDebt(@Req() request: Request) {
		const {debtId} = request.params;
		const debt = await this.debtService.getDebtByIdAndAuthor(debtId, request.user._id);
		return this.debtService.deleteDebt(request, debt);
	}
	
	@UseGuards(JwtAuthGuard, DebtAuthorGuard)
	@Post('/edit_debt/:debtId')
	async editDebt(@Req() request: Request, @Body() editValues: EditDebtDto) {
		return this.debtService.editDebt(request, editValues);
	}
}
