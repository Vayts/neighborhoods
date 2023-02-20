import React, { useState } from 'react';
import { IDeleteDebt } from '@src/components/Modal/DeleteDebtModal/types';
import { Title } from '@src/components/Title/Title';
import { useTranslation } from 'react-i18next';
import { Description } from '@src/components/Description/Description';
import { Button } from '@src/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { reopenDebtRequest } from '@src/store/debtors/actions';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';
import { selectCurrentDebtors } from '@src/store/debtors/selectors';
import { baseSlice } from '@src/store/base/reducer';
import { ReopenButtons, ReopenDebtWrapper } from '@src/components/Modal/ReopenDebtModal/style';

export const ReopenDebtModal: React.FC<IDeleteDebt> = ({ debt }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const axiosPrivate = useAxiosPrivate();
	const [isLoading, setLoading] = useState(false);
	const debtors = useAppSelector(selectCurrentDebtors);
	
	const reopenDebt = () => {
		dispatch(reopenDebtRequest(axiosPrivate, setLoading, debt._id, debtors));
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
