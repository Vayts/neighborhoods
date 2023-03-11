import React, { useEffect, useState } from 'react';
import {
	DebtHistoryItemWrapper,
} from '@src/components/Modal/Debt/DebtHistoryModal/DebtHistoryItem/style';
import { useTranslation } from 'react-i18next';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { selectUser } from '@src/store/auth/user/selectors';
import { useAppSelector } from '@src/hooks/hooks';
import { IDebtHistoryItem } from '@src/types/debt.types';
import { UserEventItem } from '@src/components/UserEventItem/UserEventItem';

interface IDebtHistoryItemProps {
	debtHistory: IDebtHistoryItem,
	index: number,
}

export const DebtHistoryItem: React.FC<IDebtHistoryItemProps> = ({
	debtHistory,
	index,
}) => {
	const { t } = useTranslation();
	const [shown, setShown] = useState(false);
	const user = useAppSelector(selectUser);
	
	useEffect(() => {
		const timeout = setTimeout(() => {
			setShown(true);
		}, index * 30 > 600 ? 600 : index * 30);
		
		return () => {
			clearTimeout(timeout);
		};
	});
	
	const generateCloseItem = () => {
		return (
			<UserEventItem
				date={debtHistory.timeStamp}
				leftContent={<AvatarFiller text={debtHistory.author.login} size={35} fz={14}/>}
				title={debtHistory.author.login}
				text={user._id === debtHistory.author._id
					? `${t('youClosedTheDebt', { value: debtHistory.content.value })} ₴` : `${t('authorClosedTheDebt', {
						author: `${debtHistory.author.firstName} ${debtHistory.author.lastName.slice(0, 1)}.`,
						value: debtHistory.content.value,
					})} ₴`}
			/>
		);
	};
	
	const generateReopenItem = () => {
		return (
			<UserEventItem
				date={debtHistory.timeStamp}
				leftContent={<AvatarFiller text={debtHistory.author.login} size={35} fz={14}/>}
				title={debtHistory.author.login}
				text={user._id === debtHistory.author._id
					? `${t('youReopenTheDebt', { value: debtHistory.content.value })} ₴` : `${t('authorReopenedTheDebt', {
						author: `${debtHistory.author.firstName} ${debtHistory.author.lastName.slice(0, 1)}.`,
						value: debtHistory.content.value,
					})} ₴`}
			/>
		);
	};
	
	const generateReduceItem = () => {
		return (
			<UserEventItem
				date={debtHistory.timeStamp}
				leftContent={<AvatarFiller text={debtHistory.author.login} size={35} fz={14}/>}
				title={debtHistory.author.login}
				text={user._id === debtHistory.author._id
					? `${t('youReduceDebt', { value: debtHistory.content.value })} ₴` : `${t('authorReduceDebt', {
						author: `${debtHistory.author.firstName} ${debtHistory.author.lastName.slice(0, 1)}.`,
						value: debtHistory.content.value,
					})} ₴`}
			/>
		);
	};
	
	const generateIncreaseItem = () => {
		return (
			<UserEventItem
				date={debtHistory.timeStamp}
				leftContent={<AvatarFiller text={debtHistory.author.login} size={35} fz={14}/>}
				title={debtHistory.author.login}
				text={user._id === debtHistory.author._id
					? `${t('youIncreaseDebt', { value: debtHistory.content.value })} ₴` : `${t('authorIncreaseDebt', {
						author: `${debtHistory.author.firstName} ${debtHistory.author.lastName.slice(0, 1)}.`,
						value: debtHistory.content.value,
					})} ₴`}
			/>
		);
	};
	
	const generatePartialItem = () => {
		return (
			<UserEventItem
				date={debtHistory.timeStamp}
				leftContent={<AvatarFiller text={debtHistory.debtor.login} size={35} fz={14}/>}
				title={debtHistory.author.login}
				text={user._id === debtHistory.debtor._id
					? `${t('partialPaymentOwn', { value: debtHistory.content.value })} ₴` : `${t('partialPayment', {
						debtor: `${debtHistory.debtor.firstName} ${debtHistory.debtor.lastName.slice(0, 1)}.`,
						value: debtHistory.content.value,
					})} ₴`}
			/>
		);
	};
	
	return (
		shown ? (
			<DebtHistoryItemWrapper>
				{debtHistory.content.message === 'partialReturn' && generatePartialItem()}
				{debtHistory.content.message === 'debtWasClosed' && generateCloseItem()}
				{debtHistory.content.message === 'reduceDebt' && generateReduceItem()}
				{debtHistory.content.message === 'increaseDebt' && generateIncreaseItem()}
				{debtHistory.content.message === 'debtWasReopened' && generateReopenItem()}
			</DebtHistoryItemWrapper>
		) : null
	);
};
