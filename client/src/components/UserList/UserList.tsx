import React, { useEffect, useState } from 'react';
import { IUserList } from '@src/components/UserList/types';
import { UserListContent, UserListCounter, UserListItem, UserListWrapper } from '@src/components/UserList/style';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { IUserInNeighborhood } from '@src/types/neighborhood.types';

export const UserList: React.FC<IUserList> = ({ size, userArr }) => {
	const [users, setUsers] = useState<IUserInNeighborhood[]>([]);
	const [isBig, setBig] = useState(false);
	
	useEffect(() => {
		if (userArr.length > 3) {
			setUsers(userArr.slice(0, 2));
			setBig(true);
		} else {
			setUsers(userArr);
		}
	}, []);
	
	return (
		<UserListWrapper>
			<UserListContent>
				{users.map((item, index) => {
					return (
						<UserListItem key={item.login} index={users.length - index}>
							<AvatarFiller text={item.login} size={size || 32} fz={14}/>
						</UserListItem>
					);
				})}
				{isBig ? <UserListCounter size={size || 32}>{`+${userArr.length - 2}`}</UserListCounter> : null}
			</UserListContent>
		</UserListWrapper>
	);
};
