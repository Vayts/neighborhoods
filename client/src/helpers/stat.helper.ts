import { IMonthDebt } from '@src/store/dashboard/types';

export function countTotalDebtValue(arr: IMonthDebt[], name: string): number {
	const initialValue = 0;
	return arr.reduce((acc, item) => acc + item[name], initialValue);
}
