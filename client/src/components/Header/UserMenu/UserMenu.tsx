import React, { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectUser } from '@src/store/auth/selectors';
import {
	UserMenuButtonWrapper, UserMenuDropdown,
	UserMenuInfo, UserMenuItem,
	UserMenuLogin,
	UserMenuName,
	UserMenuWrapper,
} from '@src/components/Header/UserMenu/style';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { useOutsideClick } from '@src/hooks/useOutsideClick';
import { useTranslation } from 'react-i18next';
import { logoutRequest } from '@src/store/auth/actions';
import { useNavigate } from 'react-router-dom';

export const UserMenu: React.FC = () => {
	const [isOpen, setOpen] = useState(false);
	const user = useAppSelector(selectUser);
	const { t } = useTranslation();
	const menuRef = useRef();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	
	const logoutHandler = () => {
		dispatch(logoutRequest(navigate));
	};
	
	useOutsideClick(menuRef, () => setOpen(false));
	
	return (
		<UserMenuWrapper ref={menuRef} isOpen={isOpen}>
			<UserMenuButtonWrapper>
				{user.avatar ? null : <AvatarFiller text={user.login} size={37} fz={15}/>}
				<UserMenuInfo>
					<UserMenuName>{`${user.firstName} ${user.lastName}`}</UserMenuName>
					<UserMenuLogin>{user.login}</UserMenuLogin>
				</UserMenuInfo>
				<span className='icon-drop-down' onClick={() => setOpen(!isOpen)}/>
			</UserMenuButtonWrapper>
			{isOpen ? (
				<UserMenuDropdown>
					<UserMenuItem>
						<span className='icon-user'/>
						{t('settings')}
					</UserMenuItem>
					<UserMenuItem color='red' onClick={() => logoutHandler()}>
						<span className='icon-log-out'/>
						{t('logout')}
					</UserMenuItem>
				</UserMenuDropdown>
			) : null}
		</UserMenuWrapper>
	);
};
