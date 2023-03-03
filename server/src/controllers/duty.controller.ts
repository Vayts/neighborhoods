import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';
import { DutyService } from '../services/duty.service';
import { Request } from 'express';

@Controller('duty')
export class DutyController {
	constructor(private dutyService: DutyService) {}
	@UseGuards(JwtAuthGuard)
	@Get('/:neighborhoodId')
	getUserDuties(@Req() request: Request) {
		return this.dutyService.getUserDuties(request);
	}
	
}
