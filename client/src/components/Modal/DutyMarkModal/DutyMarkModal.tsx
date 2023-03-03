import React from 'react';
import { DutyMarkMenu, DutyMarkMenuItem, DutyMarkModalWrapper } from '@src/components/Modal/DutyMarkModal/style';
import { IDutyMarkModal } from '@src/components/Modal/DutyMarkModal/types';
import { Title } from '@src/components/Title/Title';
import { useTranslation } from 'react-i18next';
import { format } from 'date-fns';

export const DutyMarkModal: React.FC<IDutyMarkModal> = ({ duty, neighborhood, date }) => {
	const { t } = useTranslation();
	
	return (
		<DutyMarkModalWrapper>
			<Title margin='5px auto 15px' align='center'>{duty.title}</Title>
			<Title margin='5px auto 0' fz='16px' align='center'>{format(new Date(date), 'dd/MM/yyyy')}</Title>
			<DutyMarkMenu>
				<DutyMarkMenuItem>{t('markAsDone')}</DutyMarkMenuItem>
				<DutyMarkMenuItem>{t('close')}</DutyMarkMenuItem>
			</DutyMarkMenu>
		</DutyMarkModalWrapper>
	);
};
