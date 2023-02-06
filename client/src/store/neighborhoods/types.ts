import { IDebt, INeighborhood } from '@src/types/neighborhood.types';

export interface INeighborhoodsState {
	neighborhoods: INeighborhood[];
	currentDebts: {
		debts: IDebt[],
		filters: {
			authors: string[],
			status: string[],
			minValue: number | string,
			maxValue: number | string,
		}
	};
	currentNeighborhood: INeighborhood | null;
}

export interface IDebtValueState {
	key: string,
	value: number | string,
}
