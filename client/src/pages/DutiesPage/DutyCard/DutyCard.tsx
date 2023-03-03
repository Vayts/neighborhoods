import React from 'react';
import { IDuty } from '@src/types/duty.types';
import {
	DutyCardBottomContent,
	DutyCardContent,
	DutyCardDetailsButton,
	DutyCardWrapper,
	DutyMenuWrapper,
} from '@src/pages/DutiesPage/DutyCard/style';
import { Title } from '@src/components/Title/Title';

import { Menu } from '@src/components/UI/Menu/Menu';
import { DutyCalendar } from '@src/pages/DutiesPage/DutyCard/DutyCalendar/DutyCalendar';
import { UserList } from '@src/components/UserList/UserList';
import { useTranslation } from 'react-i18next';

interface IDutyCard {
	duty: IDuty;
}

export const DutyCard: React.FC<IDutyCard> = ({ duty }) => {
	const { t } = useTranslation();
	
	return (
		<DutyCardWrapper>
			<DutyCardContent>
				<DutyMenuWrapper>
					<Menu />
				</DutyMenuWrapper>
				<Title margin='20px 25px 10px' align='center'>{duty.title}</Title>
				<DutyCalendar marks={duty.marks} members={duty.members} duty={duty}/>
				<DutyCardBottomContent>
					<UserList userArr={duty.members}/>
					<DutyCardDetailsButton>{t('details')}</DutyCardDetailsButton>
				</DutyCardBottomContent>
			</DutyCardContent>
		</DutyCardWrapper>
	);
};
