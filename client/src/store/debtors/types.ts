import { IDebt } from '@src/types/debt.types';

export interface IDebtorsState {
	list: IDebt[];
	filters: {
		debtors: string[],
		status: string[],
		minValue: number | string,
		maxValue: number | string,
	}
}

export interface IDebtorsValueState {
	key: string,
	value: number | string,
}
