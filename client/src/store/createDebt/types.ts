import { INeighborhood } from '@src/types/neighborhood.types';

export interface ICreateDebt {
	form: {
		title: string;
		description: string | null;
		value: number | string;
		expDate: null | number;
		debtor: Record<string, string>;
	}
	neighborhood: INeighborhood;
	errors: Record<string, string>,
	touched: Record<string, boolean>,
	isLoading: boolean,
}

export interface ISetDebtValuePayload {
	name: string,
	value: string | Date | number,
}
