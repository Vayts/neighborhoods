import { IDebt } from '@src/types/debt.types';

export interface IDebtsState {
	list: IDebt[];
	filters: {
		users: string[],
		status: string[],
		minValue: number | string,
		maxValue: number | string,
	},
	debtsFirstLoad: boolean,
	debtorsFirstLoad: boolean,
	isLoading: boolean,
	minorIsLoading: boolean,
	updateValue: number | null,
}

export interface IDebtValueState {
	key: string,
	value: number | string,
}
