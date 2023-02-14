import {
	CanActivate, ExecutionContext,
	Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { debtServerValidate } from '../helpers/debtValidation.helper';
import { InvalidDataException } from '../exception/invalidData.exception';
import { ERRORS } from '../constants/errors';

@Injectable()
export class DebtValidateGuard implements CanActivate {
	
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const req = context.switchToHttp().getRequest();
		const result = debtServerValidate(req.body);
		if (Object.keys(result).length === 0) {
			return true;
		} else {
			throw new InvalidDataException(ERRORS.INVALID_DATA)
		}
	}
}
