import React from 'react';
import {
	DutyEventItem,
	DutyRequestItem,
} from '@src/pages/DutiesPage/DutyCard/DutyMark/style';
import { IDutyMark } from '@src/pages/DutiesPage/DutyCard/DutyCalendar/types';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { getMarkAuthorById } from '@helpers/duty.helper';
import { IUserInNeighborhood } from '@src/types/neighborhood.types';
import { useTranslation } from 'react-i18next';

interface IDutyMarkLabel {
	event: IDutyMark,
	members: IUserInNeighborhood[],
}

export const DutyMarkLabel: React.FC<IDutyMarkLabel> = ({ event, members }) => {
	const { t } = useTranslation();
	const generateMarkContent = () => {
		const author = getMarkAuthorById(members, event.author as string);
		const recipient = getMarkAuthorById(members, event?.recipient as unknown as string);
		
		return (
			<>
				{event.type === 'dutyMark' && (
					<DutyEventItem title={`${author.firstName} ${author.lastName}`}>
						<AvatarFiller size={25} fz={12} text={author.login}/>
					</DutyEventItem>
				)}
				{event.type === 'dutyRequest' && (
					<DutyEventItem 
						title={
							!recipient ? t('dutyRequestAbbr', { author: `${author.firstName} ${author.lastName}` }) 
								: t('dutyRequestAbbrWithRecipient', { author: `${author.firstName} ${author.lastName}`, recipient: `${recipient.firstName} ${recipient.lastName}` })
						}
					>
						<DutyRequestItem>!</DutyRequestItem>
					</DutyEventItem>
				)}
			</>
		);
	};
	
	return (
		<>
			{generateMarkContent()}
		</>
	);
};
