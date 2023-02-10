import { IDebt } from '@src/types/debt.types';

export interface IDebtorsState {
	list: IDebt[];
	filters: {
		debtors: string[],
		status: string[],
		minValue: number | string,
		maxValue: number | string,
	}
	updateValue: number | null,
}

export interface IDebtorsValueState {
	key: string,
	value: number | string,
}
