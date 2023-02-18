import React, { useState } from 'react';
import { IDeleteDebt } from '@src/components/Modal/DeleteDebtModal/types';
import { DeleteButtons, DeleteDebtWrapper } from '@src/components/Modal/DeleteDebtModal/style';
import { Title } from '@src/components/Title/Title';
import { useTranslation } from 'react-i18next';
import { Description } from '@src/components/Description/Description';
import { Button } from '@src/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { deleteDebtRequest } from '@src/store/debtors/actions';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';
import { selectCurrentDebtors } from '@src/store/debtors/selectors';
import { baseSlice } from '@src/store/base/reducer';

export const DeleteDebtModal: React.FC<IDeleteDebt> = ({ debt }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const axiosPrivate = useAxiosPrivate();
	const [isLoading, setLoading] = useState(false);
	const debtors = useAppSelector(selectCurrentDebtors);
	
	const deleteDebt = () => {
		dispatch(deleteDebtRequest(axiosPrivate, setLoading, debt.neighborhood, debt._id, debtors));
	};
	
	const closeModal = () => {
		dispatch(baseSlice.actions.resetModal());
	};
	
	return (
		<DeleteDebtWrapper>
			<Title>{t('rlyWantToDeleteDebt')}</Title>
			<Description fz='16px' margin='5px 0 35px'>{debt.title}</Description>
			<DeleteButtons>
				<Button
					onClick={() => deleteDebt()}
					title={t('yes')}
					width='40%'
					isLoading={isLoading}
					isDisabled={isLoading}
				/>
				<Button onClick={() => closeModal()} title={t('no')} width='40%'/>
			</DeleteButtons>
		</DeleteDebtWrapper>
	);
};
