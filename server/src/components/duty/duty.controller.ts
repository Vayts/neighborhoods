import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../guards/jwtAuth.guard';
import { DutyService } from './duty.service';
import { Request } from 'express';
import { UserInDutyGuard } from '../../guards/userInDuty.guard';
import { UserInNeighborhoodGuard } from '../../guards/userInNeighborhood.guard';
import { DutyRequestDto } from '../../dto/dutyRequest.dto';
import { DutyMarkDto } from '../../dto/dutyMark.dto';

@Controller('duty')
export class DutyController {
	constructor(private dutyService: DutyService) {}
	@UseGuards(JwtAuthGuard)
	@Get('/:neighborhoodId')
	getUserDuties(@Req() request: Request) {
		return this.dutyService.getUserDuties(request);
	}
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard, UserInDutyGuard)
	@Post('/add_mark/:neighborhoodId/:dutyId')
	addMarkToDuty(@Req() request: Request, @Body() dto: DutyMarkDto) {
		return this.dutyService.addMarkToDuty(request, dto);
	}
	
	@UseGuards(JwtAuthGuard, UserInNeighborhoodGuard, UserInDutyGuard)
	@Post('/add_request/:neighborhoodId/:dutyId')
	addRequestToDuty(@Req() request: Request, @Body() dto: DutyRequestDto) {
		return this.dutyService.addRequestToDuty(request, dto);
	}
}
