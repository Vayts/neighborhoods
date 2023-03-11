import {
	CanActivate,
	ExecutionContext,
	Injectable, UnauthorizedException,
} from '@nestjs/common';
import { ERRORS } from '../constants/errors';
import { NeighborhoodService } from '../components/neighborhood/neighborhood.service';

@Injectable()
export class UserInNeighborhoodGuard implements CanActivate {
	
	constructor(private neighborhoodService: NeighborhoodService) {
	}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const {neighborhoodId} = req.params;
		try {
			const isInNeighborhood = await this.neighborhoodService.getUserInNeighborhood(req, neighborhoodId);
			if (!isInNeighborhood) return Promise.reject(ERRORS.NO_ACCESS)
			return true;
		} catch (e) {
			throw new UnauthorizedException({message: ERRORS.NO_ACCESS})
		}
	}
}
