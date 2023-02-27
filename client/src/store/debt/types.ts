import { IDebt, IDebtHistoryItem } from '@src/types/debt.types';

export interface IDebtState {
	debt: IDebt,
	isLoading: boolean,
	debtHistory: {
		list: IDebtHistoryItem[],
		isLoading: boolean,
	}
}
