import React, { useEffect } from 'react';
import { IDebtHistory } from '@src/components/Modal/Debt/DebtHistoryModal/types';
import {
	DebtHistoryList,
	DebtHistoryNoContent,
	DebtHistoryWrapper,
} from '@src/components/Modal/Debt/DebtHistoryModal/style';
import { DebtHistoryItem } from '@src/components/Modal/Debt/DebtHistoryModal/DebtHistoryItem/DebtHistoryItem';
import { Loader } from '@src/components/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { Title } from '@src/components/Title/Title';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectDebtHistory, selectDebtHistoryLoading } from '@src/store/debt/selectors';
import { getDebtHistory } from '@src/store/debt/actions';

export const DebtHistoryModal: React.FC<IDebtHistory> = ({ debt }) => {
	const isLoading = useAppSelector(selectDebtHistoryLoading);
	const history = useAppSelector(selectDebtHistory);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	
	useEffect(() => {
		dispatch(getDebtHistory(debt._id, debt.neighborhood));
	}, []);
	
	const generateDebtHistoryContent = () => {
		if (history.length > 0) {
			return (
				<>
					<Title margin='0 0 15px' align='center'>{t('debtHistory')}</Title>
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
