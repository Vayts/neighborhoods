import { IDebt } from '@src/types/debt.types';

export interface IDebtsList {
	debts: IDebt[],
	isLoading?: boolean,
	isDebtors: boolean,
}
