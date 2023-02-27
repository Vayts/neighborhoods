import { INeighborhood } from '@src/types/neighborhood.types';

export interface INeighborhoodsState {
	neighborhoods: INeighborhood[];
	isLoading: boolean;
}
