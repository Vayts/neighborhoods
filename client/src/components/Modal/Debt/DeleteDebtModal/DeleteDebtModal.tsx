import React from 'react';
import { IDeleteDebt } from '@src/components/Modal/Debt/DeleteDebtModal/types';
import { DeleteButtons, DeleteDebtWrapper } from '@src/components/Modal/Debt/DeleteDebtModal/style';
import { Title } from '@src/components/Title/Title';
import { useTranslation } from 'react-i18next';
import { Description } from '@src/components/Description/Description';
import { Button } from '@src/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { deleteDebtRequest } from '@src/store/debts/actions';
import { selectMinorDebtIsLoading } from '@src/store/debts/selectors';
import { resetModal } from '@src/store/base/reducer';

export const DeleteDebtModal: React.FC<IDeleteDebt> = ({ debt }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectMinorDebtIsLoading);
	
	const deleteDebt = () => {
		dispatch(deleteDebtRequest(debt._id));
	};
	
	const closeModal = () => {
		dispatch(resetModal());
	};
	
	return (
		<DeleteDebtWrapper>
			<Title fz='19px' margin='0' align='center'>{t('rlyWantToDeleteDebt')}</Title>
			<Description fz='14px' margin='5px 0 35px'>{t('deleteDebtDescription')}</Description>
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
