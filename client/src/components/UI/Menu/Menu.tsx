import React, { useRef, useState } from 'react';
import { MenuContent, MenuIcon, MenuWrapper } from '@src/components/UI/Menu/style';
import { IMenu } from '@src/components/UI/Menu/types';
import { useOutsideClick } from '@src/hooks/useOutsideClick';
import { useAppSelector } from '@src/hooks/hooks';
import { selectModal } from '@src/store/base/selectors';

export const Menu: React.FC<IMenu> = ({ icon, children }) => {
	const menuRef = useRef<HTMLDivElement>(null);
	const modal = useAppSelector(selectModal).type;
	const [isOpen, setOpen] = useState(false);
	
	useOutsideClick(menuRef, () => {
		if (!modal) {
			setOpen(false);
		}
	}, modal);
	
	return (
		<MenuWrapper ref={menuRef}>
			{isOpen ? null : <MenuIcon className={icon || 'icon-more'} onClick={() => setOpen(true)}/>}
			<MenuContent isOpen={isOpen}>
				{children}
			</MenuContent>
		</MenuWrapper>
	);
};
