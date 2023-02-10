import React, { useState } from 'react';
import {
	CloseDebtButtons,
	CloseDebtMenuWrapper,
	CloseDebtSubTitle,
} from '@src/components/Modal/СloseDebtModal/style';
import { useTranslation } from 'react-i18next';
import { ICloseDebtMenu } from '@src/components/Modal/СloseDebtModal/types';
import { Title } from '@src/components/Title/Title';
import { Button } from '@src/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { closeDebtRequest } from '@src/store/debtors/actions';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';
import { baseSlice } from '@src/store/base/reducer';
import { selectCurrentDebtors } from '@src/store/debtors/selectors';

export const CloseDebtModal: React.FC<ICloseDebtMenu> = ({ value, title, _id }) => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const axiosPrivate = useAxiosPrivate();
	const debts = useAppSelector(selectCurrentDebtors);
	const closeDebt = () => {
		dispatch(closeDebtRequest(axiosPrivate, setLoading, _id, debts));
		dispatch(baseSlice.actions.resetModal());
	};
	
	const closeModal = () => {
		dispatch(baseSlice.actions.resetModal());
	};
	
	return (
		<CloseDebtMenuWrapper>
			<Title margin='5px 0'>{t('doYouWantCLoseDebt')}</Title>
			<CloseDebtSubTitle>{`${title} - ${value} ₴`}</CloseDebtSubTitle>
			<CloseDebtButtons>
				<Button onClick={() => closeDebt()} title={t('yes')} width='40%' isLoading={isLoading}/>
				<Button onClick={() => closeModal()} title={t('no')} width='40%'/>
			</CloseDebtButtons>
		</CloseDebtMenuWrapper>
	);
};
