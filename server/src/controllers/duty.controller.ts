import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../guards/jwtAuth.guard';
import { DutyService } from '../services/duty.service';

@Controller('duty')
export class DutyController {
	constructor(private dutyService: DutyService) {}
	@UseGuards(JwtAuthGuard)
	@Get('/:neighborhoodId')
	getUserDuties() {
		return this.dutyService.getUserDuties();
	}
	
}
