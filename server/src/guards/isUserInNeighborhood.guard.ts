import {
	CanActivate,
	ExecutionContext,
	Injectable, UnauthorizedException,
} from '@nestjs/common';
import { ERRORS } from '../constants/errors';
import { NeighborhoodService } from '../services/neighborhood.service';

@Injectable()
export class isUserInNeighborhood implements CanActivate {
	
	constructor(private neighborhoodService: NeighborhoodService) {
	}
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest();
		const {id} = req.params;
		try {
			const isInNeighborhood = await this.neighborhoodService.getUserInNeighborhood(req, id);
			if (!isInNeighborhood) return Promise.reject(ERRORS.NO_ACCESS)
			return true;
		} catch (e) {
			throw new UnauthorizedException({message: ERRORS.NO_ACCESS})
		}
	}
}
