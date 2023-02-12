import React from 'react';
import { AddButtonIcon, AddButtonWrapper } from '@src/components/UI/AddButton/style';
import { IAddButton } from '@src/components/UI/AddButton/types';

export const AddButton: React.FC<IAddButton> = ({ fz, size, clickHandler }) => {
	return (
		<AddButtonWrapper onClick={() => clickHandler()} size={size}>
			<AddButtonIcon fz={fz} className='icon-plus'/>
		</AddButtonWrapper>
	);
};
