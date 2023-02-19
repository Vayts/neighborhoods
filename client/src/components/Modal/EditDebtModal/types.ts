import { IDebt } from '@src/types/debt.types';

export interface IEditDebt {
	debt: IDebt;
}

export interface IEditDebtErrors {
	title?: string;
	description?: string;
	expDate?: string;
}

export interface IEditDebtTouched {
	title?: boolean;
	description?: boolean;
	expDate?: boolean;
}
