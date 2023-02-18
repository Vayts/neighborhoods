import React, { useEffect, useState } from 'react';
import { IDebtHistoryItem } from '@src/components/Modal/DebtHistoryModal/types';
import {
	DebtHistoryContent,
	DebtHistoryDate,
	DebtHistoryItemText, DebtHistoryItemTitle,
	DebtHistoryItemWrapper, DebtHistoryMainInfo, DebtHistorySubInfo,
} from '@src/components/Modal/DebtHistoryModal/DebtHistoryItem/style';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { Title } from '@src/components/Title/Title';
import { useAppSelector } from '@src/hooks/hooks';
import { selectUser } from '@src/store/auth/selectors';

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
	
	return (
		shown ? (
			<DebtHistoryItemWrapper>
				{debtHistory.content.message === 'partialReturn'
					&& (
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
					)}
				{debtHistory.content.message === 'debtWasClosed'
					&& (
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
					)}
			</DebtHistoryItemWrapper>
		) : null
	);
};
