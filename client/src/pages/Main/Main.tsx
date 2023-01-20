import React from 'react';
import { MainPageDivider, MainPageWrapper } from '@src/pages/Main/style';
import { InfoBlocksRow } from '@src/pages/Main/InfoBlocksRow/InfoBlocksRow';
import { StatActivityRow } from '@src/pages/Main/StatActivityRow/StatActivityRow';

export const Main: React.FC = () => {
	return (
		<MainPageWrapper>
			<MainPageDivider>
				<InfoBlocksRow/>
			</MainPageDivider>
			<MainPageDivider>
				<StatActivityRow/>
			</MainPageDivider>
		</MainPageWrapper>
	);
};
