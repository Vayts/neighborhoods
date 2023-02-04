import { IDebt } from '@src/types/neighborhood.types';

export interface IDebtItem extends IDebt {
	index: number,
}
export interface IDebtContent extends IDebt {
	isOpen?: boolean,
	setOpen?: (state: boolean) => void,
}
