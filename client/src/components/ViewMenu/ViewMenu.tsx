import React from 'react';
import { IViewMenu } from '@src/components/ViewMenu/types';
import { ViewMenuIcon, ViewMenuItem, ViewMenuWrapper } from '@src/components/ViewMenu/style';

export const ViewMenu: React.FC<IViewMenu> = ({ mode = 'table', setMode }) => {
	return (
		<ViewMenuWrapper>
			<ViewMenuItem isActive={mode === 'table'} onClick={() => setMode('table')}>
				<ViewMenuIcon className='icon-description'/>
			</ViewMenuItem>
			<ViewMenuItem isActive={mode === 'blocks'} onClick={() => setMode('blocks')}>
				<ViewMenuIcon className='icon-Project'/>
			</ViewMenuItem>
		</ViewMenuWrapper>
	);
};
