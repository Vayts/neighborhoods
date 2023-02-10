import { IDebt } from '@src/types/debt.types';

export interface IDebtsState {
	list: IDebt[];
	filters: {
		authors: string[],
		status: string[],
		minValue: number | string,
		maxValue: number | string,
	},
	updateValue: number | null,
}

export interface IDebtValueState {
	key: string,
	value: number | string,
}
