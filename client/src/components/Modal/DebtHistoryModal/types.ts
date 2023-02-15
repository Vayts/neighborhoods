import { IUserEvent } from '@src/types/userEvent.types';
import { IDebt } from '@src/types/debt.types';
import { IUserInNeighborhood } from '@src/types/neighborhood.types';

export interface IDebtHistory {
	debt: IDebt;
}

export interface IDebtHistoryItem extends IUserEvent {
	content: {
		value: number,
		message: string,
		debt: string,
	};
	debt: IDebt;
	debtor: IUserInNeighborhood,
}
