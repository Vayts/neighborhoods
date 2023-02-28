import React from 'react';
import { IDeleteDebt } from '@src/components/Modal/Debt/DeleteDebtModal/types';
import { Title } from '@src/components/Title/Title';
import { useTranslation } from 'react-i18next';
import { Description } from '@src/components/Description/Description';
import { Button } from '@src/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { reopenDebtRequest } from '@src/store/debts/actions';
import { resetModal } from '@src/store/base/reducer';
import { ReopenButtons, ReopenDebtWrapper } from '@src/components/Modal/Debt/ReopenDebtModal/style';
import { selectMinorDebtIsLoading } from '@src/store/debts/selectors';

export const ReopenDebtModal: React.FC<IDeleteDebt> = ({ debt }) => {
	const isLoading = useAppSelector(selectMinorDebtIsLoading);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	
	const reopenDebt = () => {
		dispatch(reopenDebtRequest(debt._id));
	};
	
	const closeModal = () => {
		dispatch(resetModal());
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
