interface NeighborsInterface {
	id: string | number,
	nickname: string,
	avatar: string | null,
	neighborhoodName: string,
	debtsValue: number,
	debtorValue: number,
}
interface IDebtStat {
	titleKey: string,
	returnedDebts: number,
	receivedDebts: number,
	color: string
}

export interface IMonthDebt {
	nameKey: string,
	debtsActive: number,
	debtsRepaid: number,
}

interface IActivityDebt {
	titleKey: string,
	valueArr: IMonthDebt[],
	subColor: string,
	color: string,
}

export interface IDashboardState {
	debtsInfo: {
		debt: {
			counter: number,
			value: number,
		},
		debtor: {
			counter: number,
			value: number,
		}
		total: {
			returned: number,
			totalValue: number,
		}
	}
	statActivity: {
		stats: IDebtStat[],
		activity: IActivityDebt[],
		topNeighbors: NeighborsInterface[],
	}
}
