import {
	CanActivate,
	ExecutionContext,
	Injectable, UnauthorizedException,
} from '@nestjs/common';
import { ERRORS } from '../constants/errors';
import { DutyService } from '../components/duty/duty.service';

@Injectable()
export class UserInDutyGuard implements CanActivate {
	
	constructor(private dutyService: DutyService) {
	}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const { dutyId } = req.params;
		const user = req.user;
		try {
			const isInDuty = await this.dutyService.getDutyByMemberIdAndDutyId(user._id, dutyId);
			if (!isInDuty) return Promise.reject(ERRORS.NO_ACCESS)
			return true;
		} catch (e) {
			throw new UnauthorizedException({message: ERRORS.NO_ACCESS})
		}
	}
}
