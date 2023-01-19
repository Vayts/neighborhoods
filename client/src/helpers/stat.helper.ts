import { getPercentageNumberFromNumber } from '@helpers/number.helper';
import { UserState } from '@src/store/user/types';
import { ActivityItemInterface } from '@src/types/user.types';
import i18n from '../i18n';

interface UserLastDebtsState {
	title: string,
	value: number,
	color: string,
	totalValue: number,
}

export function generateState(user: UserState['main']): UserLastDebtsState[] {
	const t = i18n.t;
	
	return [
		{
			title: t('thisMonth'),
			value: getPercentageNumberFromNumber(user.debtsReturnThisMonth, user.debtsReceivedThisMonth),
			color: '#52CD9F',
			totalValue: user.debtsReturnThisMonth,
		},
		{
			title: t('prevMonth'),
			value: getPercentageNumberFromNumber(user.debtsReturnPrevMonth, user.debtsReceivedPrevMonth),
			color: '#FF9F38',
			totalValue: user.debtsReturnPrevMonth,
		},
		{
			title: t('total'),
			value: getPercentageNumberFromNumber(user.debtsReturnTotal, user.debtsReceivedTotal),
			color: '#E391EA',
			totalValue: user.debtsReturnTotal,
		},
	];
}

interface UserLastActivityDebtsState {
	title: string,
	value: ActivityItemInterface[]
	color: string,
	subColor: string,
	subValue: number,
	subTitle: string,
	
	subGoal: number,
}

function countTotalDebtValue(arr, name) {
	const initialValue = 0;
	return arr.reduce((acc, item) => acc + item[name], initialValue);
}

export function generateChartState(user: UserState['main']): UserLastActivityDebtsState[] {
	const t = i18n.t;
	
	return [
		{
			title: t('yourDebts'),
			value: user.activity.debts,
			color: '#52CD9F',
			subColor: '#FF9F38',
			subValue: countTotalDebtValue(user.activity.debts, 'debtsRepaid'),
			subGoal: countTotalDebtValue(user.activity.debts, 'debtsReceived'),
			subTitle: t('youReturn'),
		}, {
			title: t('yourDebtors'),
			value: user.activity.debtor,
			color: '#FF9F38',
			subColor: '#52CD9F',
			subValue: countTotalDebtValue(user.activity.debtor, 'debtsRepaid'),
			subGoal: countTotalDebtValue(user.activity.debtor, 'debtsReceived'),
			subTitle: t('youWereReturn'),
		},
	];
}
