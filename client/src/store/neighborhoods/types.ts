import { IDebt, INeighborhood } from '@src/types/neighborhood.types';

export interface INeighborhoodsState {
	neighborhoods: INeighborhood[];
	currentDebts: IDebt[];
	currentNeighborhood: INeighborhood | null;
}
