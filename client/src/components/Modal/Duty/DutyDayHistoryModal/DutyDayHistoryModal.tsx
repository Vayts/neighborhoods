import React from 'react';
import { IDutyDayHistory } from '@src/components/Modal/Duty/DutyDayHistoryModal/types';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { getMarkAuthorById } from '@helpers/duty.helper';
import { useTranslation } from 'react-i18next';
import { UserEventItem } from '@src/components/UserEventItem/UserEventItem';
import { Title } from '@src/components/Title/Title';
import { useAppSelector } from '@src/hooks/hooks';
import { selectUser } from '@src/store/auth/user/selectors';
import {
	DutyDayDeleteButton,
	DutyDayHistoryItem,
	DutyDayHistoryList, DutyDayHistoryRequest,
	DutyDayHistoryWrapper, DutyDayRightWrapper,
} from './style';

export const DutyDayHistoryModal: React.FC<IDutyDayHistory> = ({ marks, members }) => {
	const { t } = useTranslation();
	const user = useAppSelector(selectUser);
	const generateDutyHistoryItem = (mark) => {
		const author = getMarkAuthorById(members, mark.author);
		const recipient = getMarkAuthorById(members, mark.recipient);
		if (mark.type === 'dutyMark') {
			return (
				<UserEventItem
					leftContent={<AvatarFiller text={author.login} size={35} fz={14}/>}
					title={`${author.firstName} ${author.lastName}`}
					rightContent={(
						<DutyDayRightWrapper>
							{author._id === user._id && <DutyDayDeleteButton className='icon-delete'/>}
						</DutyDayRightWrapper>
					)}
					text={t('markOfCompletingText')}
					date={mark.timeStamp}
				/>
			);
		}
		if (mark.type === 'dutyRequest') {
			return (
				<UserEventItem
					leftContent={(
						<DutyDayHistoryRequest>
							<span>!</span>
						</DutyDayHistoryRequest>
					)}
					rightContent={(
						<DutyDayRightWrapper>
							{author._id === user._id && <DutyDayDeleteButton className='icon-delete'/>}
						</DutyDayRightWrapper>
					)}
					title={`${author.firstName} ${author.lastName}`}
					text={
						!recipient ? t('dutyRequestAbbr', { author: `${author.firstName} ${author.lastName}` })
							: t('dutyRequestAbbrWithRecipient', { author: `${author.firstName} ${author.lastName}`, recipient: `${recipient.firstName} ${recipient.lastName}` })
					}
					date={mark.timeStamp}
				/>
			);
		}
	};
	
	return (
		<DutyDayHistoryWrapper>
			<Title margin='0 0 15px' align='center'>{t('activity')}</Title>
			<DutyDayHistoryList>
				{marks.map((item) => {
					return (
						<DutyDayHistoryItem key={item._id}>
							{generateDutyHistoryItem(item)}
						</DutyDayHistoryItem>
					);
				})}
			</DutyDayHistoryList>
		</DutyDayHistoryWrapper>
	);
};
