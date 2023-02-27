import { IUserInNeighborhood } from '@src/types/neighborhood.types';
import { IUserEvent } from '@src/types/userEvent.types';

export interface IDebt {
	_id?: string,
	title: string,
	description: string | null,
	value: number,
	initialValue: number,
	creationDate: number | Date;
	expDate: number | Date;
	status: boolean;
	photo?: string | null;
	author?: IUserInNeighborhood;
	debtor?: IUserInNeighborhood;
	neighborhood: string;
}

export interface IDebtPage {
	isDebtors?: boolean;
}
export interface IDebtContent{
	isOpen?: boolean;
	debt: IDebt;
	setOpen?: () => void;
}

export interface IDebtItem {
	index: number;
	debt: IDebt;
}

export interface ITableDebtStyle {
	shown: boolean;
}

export interface ITableDebtStatus {
	status: boolean;
}

export interface IEditDebtState {
	title: string;
	description: string;
	expDate: Date | number;
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
