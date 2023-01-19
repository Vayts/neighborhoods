import { ActivityItemInterface } from '@src/types/user.types';

interface NeighborsInterface {
	id: string | number,
	nickname: string,
	avatar: string | null,
	neighborhoodName: string,
	debtsValue: number,
	debtorValue: number,
}

export interface UserState {
	main: {
		totalDebt: number,
		debtsInTheAmount: number,
		totalDebtor: number,
		debtorInTheAmount: number,
		debtsRepaid: number,
		totalDebtsForAllTime: number,
		debtsReturnThisMonth: number,
		debtsReceivedThisMonth: number,
		debtsReturnPrevMonth: number,
		debtsReceivedPrevMonth: number,
		debtsReturnTotal: number,
		debtsReceivedTotal: number,
		activity: {
			userMoneyBackToHim: number,
			userMoneyDebt: number,
			debts: ActivityItemInterface[],
			debtor: ActivityItemInterface[],
		}
		topNeighbors: NeighborsInterface[],
	}
}
