import React, { useEffect, useState } from 'react';
import { IDebtHistory, IDebtHistoryItem } from '@src/components/Modal/DebtHistoryModal/types';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';
import {
	DebtHistoryList,
	DebtHistoryNoContent,
	DebtHistoryWrapper,
} from '@src/components/Modal/DebtHistoryModal/style';
import { DebtHistoryItem } from '@src/components/Modal/DebtHistoryModal/DebtHistoryItem/DebtHistoryItem';
import { Loader } from '@src/components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { getNotification } from '@src/notification/notifications';

export const DebtHistoryModal: React.FC<IDebtHistory> = ({ debtId, neighborhoodId }) => {
	const [history, setHistory] = useState<IDebtHistoryItem[]>([]);
	const [isLoading, setLoading] = useState<boolean>(true);
	const { t } = useTranslation();
	const axiosPrivate = useAxiosPrivate();
	
	useEffect(() => {
		axiosPrivate.get(`/debt/history/${neighborhoodId}/${debtId}`)
			.then((res) => {
				setHistory(res.data);
			})
			.then(() => {
				setLoading(false);
			}).catch(() => {
				getNotification(t('smtWntWrng'), 'error');
			});
	}, []);
	
	const generateDebtHistoryContent = () => {
		if (history.length > 0) {
			return (
				<>
					<DebtHistoryList>
						{history.map((item, index) => {
							return <DebtHistoryItem key={item._id} debtHistory={item} index={index}/>;
						})}
					</DebtHistoryList>
				</>
			);
		}
		return <DebtHistoryNoContent>{t('emptyDebtHistory')}</DebtHistoryNoContent>;
	};
	
	return (
		<DebtHistoryWrapper>
			{isLoading ? <Loader/> : generateDebtHistoryContent()}
		</DebtHistoryWrapper>
	);
};
