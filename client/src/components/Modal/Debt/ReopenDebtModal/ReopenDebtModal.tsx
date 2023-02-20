import React, { useState } from 'react';
import { IDeleteDebt } from '@src/components/Modal/Debt/DeleteDebtModal/types';
import { Title } from '@src/components/Title/Title';
import { useTranslation } from 'react-i18next';
import { Description } from '@src/components/Description/Description';
import { Button } from '@src/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { reopenDebtRequest } from '@src/store/debts/actions';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';
import { baseSlice } from '@src/store/base/reducer';
import { ReopenButtons, ReopenDebtWrapper } from '@src/components/Modal/Debt/ReopenDebtModal/style';
import { selectCurrentDebts } from '@src/store/debts/selectors';

export const ReopenDebtModal: React.FC<IDeleteDebt> = ({ debt }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const axiosPrivate = useAxiosPrivate();
	const [isLoading, setLoading] = useState(false);
	const debts = useAppSelector(selectCurrentDebts);
	
	const reopenDebt = () => {
		dispatch(reopenDebtRequest(axiosPrivate, setLoading, debt._id, debts));
	};
	
	const closeModal = () => {
		dispatch(baseSlice.actions.resetModal());
	};
	
	return (
		<ReopenDebtWrapper>
			<Title margin='0' align='center'>{t('rlyWantToReopenDebt')}</Title>
			<Description fz='14px' margin='5px 0 35px'>{t('reopenDebtDescription')}</Description>
			<ReopenButtons>
				<Button
					onClick={() => reopenDebt()}
					title={t('yes')}
					width='40%'
					isLoading={isLoading}
					isDisabled={isLoading}
				/>
				<Button onClick={() => closeModal()} title={t('no')} width='40%'/>
			</ReopenButtons>
		</ReopenDebtWrapper>
	);
};
