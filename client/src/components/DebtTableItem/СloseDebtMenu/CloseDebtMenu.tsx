import React from 'react';
import {
	CloseDebtButtons,
	CloseDebtMenuWrapper,
	CloseDebtSubTitle,
} from '@src/components/DebtTableItem/СloseDebtMenu/style';
import { useTranslation } from 'react-i18next';
import { ICloseDebtMenu } from '@src/components/DebtTableItem/СloseDebtMenu/types';
import { Title } from '@src/components/Title/Title';
import { Button } from '@src/components/UI/Button/Button';

export const CloseDebtMenu: React.FC<ICloseDebtMenu> = ({ value, title, _id }) => {
	const { t } = useTranslation();
	
	return (
		<CloseDebtMenuWrapper>
			<Title margin='5px 0'>{t('doYouWantCLoseDebt')}</Title>
			<CloseDebtSubTitle>{`${title} - ${value} ₴`}</CloseDebtSubTitle>
			<CloseDebtButtons>
				<Button onClick={() => {}} title={t('yes')} width='40%'/>
				<Button onClick={() => {}} title={t('no')} width='40%'/>
			</CloseDebtButtons>
		</CloseDebtMenuWrapper>
	);
};
