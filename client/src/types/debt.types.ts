import { IUserInNeighborhood } from '@src/types/neighborhood.types';

export interface IDebt {
	_id?: string,
	title: string,
	description: string | null,
	value: number,
	creationDate: string | Date,
	expDate: null | string | Date,
	status: boolean,
	photo?: string | null,
	author?: IUserInNeighborhood,
	debtor?: IUserInNeighborhood,
}
export interface IDebtContent extends IDebt {
	isOpen?: boolean,
	setOpen?: (state: boolean) => void,
}

export interface IDebtItem extends IDebt {
	index: number,
}

export interface ITableDebtStyle {
	shown: boolean,
}

export interface ITableDebtStatus {
	status: boolean
}
