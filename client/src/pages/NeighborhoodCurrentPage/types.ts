import { IDebt } from '@src/types/neighborhood.types';

export interface IDebtItem extends IDebt {
	index: number,
}

export interface IDebtsList {
	debts: IDebt[],
}
