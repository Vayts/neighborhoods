import {
	CanActivate,
	ExecutionContext,
	Injectable, UnauthorizedException,
} from '@nestjs/common';
import { ERRORS } from '../constants/errors';
import { DebtService } from '../services/debt.service';

@Injectable()
export class DebtAuthorGuard implements CanActivate {
	
	constructor(private debtService: DebtService) {
	}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const { debtId } = req.params;
		const user = req.user;
		try {
			const isAuthor = await this.debtService.getDebtByIdAndAuthor(debtId, user._id);
			if (!isAuthor) return Promise.reject(ERRORS.NO_ACCESS)
			return true;
		} catch (e) {
			throw new UnauthorizedException({message: ERRORS.NO_ACCESS})
		}
	}
}
