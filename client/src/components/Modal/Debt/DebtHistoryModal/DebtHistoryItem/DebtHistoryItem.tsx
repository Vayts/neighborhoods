import React, { useEffect, useState } from 'react';
import {
	DebtHistoryContent,
	DebtHistoryDate,
	DebtHistoryItemText, DebtHistoryItemTitle,
	DebtHistoryItemWrapper, DebtHistoryMainInfo, DebtHistorySubInfo,
} from '@src/components/Modal/Debt/DebtHistoryModal/DebtHistoryItem/style';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { Title } from '@src/components/Title/Title';
import { selectUser } from '@src/store/auth/user/selectors';
import { useAppSelector } from '@src/hooks/hooks';
import { IDebtHistoryItem } from '@src/types/debt.types';

interface IDebtHistoryItemProps {
	debtHistory: IDebtHistoryItem,
	index: number,
}

export const DebtHistoryItem: React.FC<IDebtHistoryItemProps> = ({ debtHistory, index }) => {
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
			<DebtHistoryContent>
				<AvatarFiller text={debtHistory.author.login} size={35} fz={14}/>
				<DebtHistoryMainInfo>
					<DebtHistoryItemTitle>
						<Title fz='16px' margin='0'>{debtHistory.author.login}</Title>
						<DebtHistoryDate>{format(new Date(debtHistory.timeStamp), 'dd/MM/yy HH:mm')}</DebtHistoryDate>
					</DebtHistoryItemTitle>
					<DebtHistorySubInfo>
						<DebtHistoryItemText>
							{user._id === debtHistory.author._id
								? `${t('youClosedTheDebt', { value: debtHistory.content.value })} ₴` : `${t('authorClosedTheDebt', { author: `${debtHistory.author.firstName} ${debtHistory.author.lastName.slice(0, 1)}.`, value: debtHistory.content.value })} ₴`}
						</DebtHistoryItemText>
					</DebtHistorySubInfo>
				</DebtHistoryMainInfo>
			</DebtHistoryContent>
		);
	};
	
	const generateReopenItem = () => {
		return (
			<DebtHistoryContent>
				<AvatarFiller text={debtHistory.author.login} size={35} fz={14}/>
				<DebtHistoryMainInfo>
					<DebtHistoryItemTitle>
						<Title fz='16px' margin='0'>{debtHistory.author.login}</Title>
						<DebtHistoryDate>{format(new Date(debtHistory.timeStamp), 'dd/MM/yy HH:mm')}</DebtHistoryDate>
					</DebtHistoryItemTitle>
					<DebtHistorySubInfo>
						<DebtHistoryItemText>
							{user._id === debtHistory.author._id
								? `${t('youReopenTheDebt', { value: debtHistory.content.value })} ₴` : `${t('authorReopenedTheDebt', { author: `${debtHistory.author.firstName} ${debtHistory.author.lastName.slice(0, 1)}.`, value: debtHistory.content.value })} ₴`}
						</DebtHistoryItemText>
					</DebtHistorySubInfo>
				</DebtHistoryMainInfo>
			</DebtHistoryContent>
		);
	};
	
	const generateReduceItem = () => {
		return (
			<DebtHistoryContent>
				<AvatarFiller text={debtHistory.author.login} size={35} fz={14}/>
				<DebtHistoryMainInfo>
					<DebtHistoryItemTitle>
						<Title fz='16px' margin='0'>{debtHistory.author.login}</Title>
						<DebtHistoryDate>{format(new Date(debtHistory.timeStamp), 'dd/MM/yy HH:mm')}</DebtHistoryDate>
					</DebtHistoryItemTitle>
					<DebtHistorySubInfo>
						<DebtHistoryItemText>
							{user._id === debtHistory.author._id
								? `${t('youReduceDebt', { value: debtHistory.content.value })} ₴` : `${t('authorReduceDebt', { author: `${debtHistory.author.firstName} ${debtHistory.author.lastName.slice(0, 1)}.`, value: debtHistory.content.value })} ₴`}
						</DebtHistoryItemText>
					</DebtHistorySubInfo>
				</DebtHistoryMainInfo>
			</DebtHistoryContent>
		);
	};
	
	const generateIncreaseItem = () => {
		return (
			<DebtHistoryContent>
				<AvatarFiller text={debtHistory.author.login} size={35} fz={14}/>
				<DebtHistoryMainInfo>
					<DebtHistoryItemTitle>
						<Title fz='16px' margin='0'>{debtHistory.author.login}</Title>
						<DebtHistoryDate>{format(new Date(debtHistory.timeStamp), 'dd/MM/yy HH:mm')}</DebtHistoryDate>
					</DebtHistoryItemTitle>
					<DebtHistorySubInfo>
						<DebtHistoryItemText>
							{user._id === debtHistory.author._id
								? `${t('youIncreaseDebt', { value: debtHistory.content.value })} ₴` : `${t('authorIncreaseDebt', { author: `${debtHistory.author.firstName} ${debtHistory.author.lastName.slice(0, 1)}.`, value: debtHistory.content.value })} ₴`}
						</DebtHistoryItemText>
					</DebtHistorySubInfo>
				</DebtHistoryMainInfo>
			</DebtHistoryContent>
		);
	};
	
	const generatePartialItem = () => {
		return (
			<DebtHistoryContent>
				<AvatarFiller text={debtHistory.debtor.login} size={35} fz={14}/>
				<DebtHistoryMainInfo>
					<DebtHistoryItemTitle>
						<Title fz='16px' margin='0'>{debtHistory.debtor.login}</Title>
						<DebtHistoryDate>{format(new Date(debtHistory.timeStamp), 'dd/MM/yy HH:mm')}</DebtHistoryDate>
					</DebtHistoryItemTitle>
					<DebtHistorySubInfo>
						<DebtHistoryItemText>
							{user._id === debtHistory.debtor._id
								? `${t('partialPaymentOwn', { value: debtHistory.content.value })} ₴` : `${t('partialPayment', { debtor: `${debtHistory.debtor.firstName} ${debtHistory.debtor.lastName.slice(0, 1)}.`, value: debtHistory.content.value })} ₴`}
						</DebtHistoryItemText>
					</DebtHistorySubInfo>
				</DebtHistoryMainInfo>
			</DebtHistoryContent>
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
