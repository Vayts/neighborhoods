import React from 'react';
import { IUserEventItem } from '@src/components/UserEventItem/types';
import {
	UserEventDate,
	UserEventItemWrapper,
	UserEventLeftSide, UserEventMainInfo,
	UserEventRightSide, UserEventText,
	UserEventTitleWrapper,
} from '@src/components/UserEventItem/style';
import { Title } from '@src/components/Title/Title';
import { format } from 'date-fns';

export const UserEventItem: React.FC<IUserEventItem> = ({ leftContent, rightContent, date, title, text }) => {
	return (
		<UserEventItemWrapper>
			<UserEventLeftSide>
				{leftContent}
			</UserEventLeftSide>
			<UserEventMainInfo>
				<UserEventTitleWrapper>
					<Title fz='16px' margin='0'>{title}</Title>
					<UserEventDate>{format(new Date(date), 'dd/MM/yy HH:mm')}</UserEventDate>
				</UserEventTitleWrapper>
				<UserEventText>{text}</UserEventText>
			</UserEventMainInfo>
			{rightContent && (
				<UserEventRightSide>
					{rightContent}
				</UserEventRightSide>
			)}
		</UserEventItemWrapper>
	);
};
