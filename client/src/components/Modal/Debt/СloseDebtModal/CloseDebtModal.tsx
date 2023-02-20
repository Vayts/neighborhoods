import React, { useState } from 'react';
import {
	CloseDebtButtons,
	CloseDebtMenuWrapper,
} from '@src/components/Modal/Debt/СloseDebtModal/style';
import { useTranslation } from 'react-i18next';
import { ICloseDebtMenu } from '@src/components/Modal/Debt/СloseDebtModal/types';
import { Title } from '@src/components/Title/Title';
import { Button } from '@src/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { closeDebtRequest } from '@src/store/debts/actions';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';
import { baseSlice } from '@src/store/base/reducer';
import { Description } from '@src/components/Description/Description';
import { selectCurrentDebts } from '@src/store/debts/selectors';

export const CloseDebtModal: React.FC<ICloseDebtMenu> = ({ debt }) => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const axiosPrivate = useAxiosPrivate();
	const debts = useAppSelector(selectCurrentDebts);
	const closeDebt = () => {
		dispatch(closeDebtRequest(axiosPrivate, setLoading, debt._id, debts));
	};
	
	const closeModal = () => {
		dispatch(baseSlice.actions.resetModal());
	};
	
	return (
		<CloseDebtMenuWrapper>
			<Title margin='0' align='center'>{t('doYouWantCLoseDebt')}</Title>
			<Description fz='14px' margin='5px 0 35px'>{t('closeDebtDescription')}</Description>
			<CloseDebtButtons>
				<Button onClick={() => closeDebt()} title={t('yes')} width='40%' isLoading={isLoading}/>
				<Button onClick={() => closeModal()} title={t('no')} width='40%'/>
			</CloseDebtButtons>
		</CloseDebtMenuWrapper>
	);
};
