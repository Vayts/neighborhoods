import React from 'react';
import { IUserList } from '@src/components/UserList/types';
import { UserListContent, UserListCounter, UserListItem, UserListWrapper } from '@src/components/UserList/style';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';

export const UserList: React.FC<IUserList> = ({ size, userArr = [] }) => {
	return (
		<UserListWrapper>
			<UserListContent>
				{userArr.slice(0, 2).map((item, index) => {
					return (
						<UserListItem key={item.login} index={userArr.length - index}>
							<AvatarFiller text={item.login} size={size || 32} fz={14}/>
						</UserListItem>
					);
				})}
				{userArr.length > 3 ? <UserListCounter size={size || 32}>{`+${userArr.length - 2}`}</UserListCounter> : null}
			</UserListContent>
		</UserListWrapper>
	);
};
