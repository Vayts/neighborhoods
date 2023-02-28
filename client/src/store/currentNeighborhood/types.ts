import { INeighborhood } from '@src/types/neighborhood.types';

export interface ICurrentNeighborhoodState {
	neighborhood: INeighborhood | null;
	isLoading: boolean;
}
