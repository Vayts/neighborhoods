import { IDebt } from '@src/types/debt.types';

export interface IPartialPayment {
	neighborhood: string,
	debt: IDebt,
}
