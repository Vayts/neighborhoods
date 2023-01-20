import React from 'react';
import { BigStatBlock } from '@src/components/BigStatBlock/BigStatBlock';
import { DebtStat } from '@src/pages/Main/StatActivityRow/DebtStat/DebtStat';
import { ChartBlock } from '@src/pages/Main/StatActivityRow/ChartBlock/ChartBlock';
import { TopNeighborsBlock } from '@src/pages/Main/StatActivityRow/TopNeighborsBlock/TopNeighborsBlock';
import { useTranslation } from 'react-i18next';
import { StatBlockWrapper } from './style';

export const StatActivityRow: React.FC = () => {
	const { t } = useTranslation();
	
	return (
		<StatBlockWrapper>
			<BigStatBlock title={t('debtsRepaid')}>
				<DebtStat/>
			</BigStatBlock>
			<BigStatBlock title={t('latestActivity')}>
				<ChartBlock/>
			</BigStatBlock>
			<BigStatBlock title={t('topNeighbors')}>
				<TopNeighborsBlock/>
			</BigStatBlock>
		</StatBlockWrapper>
	);
};
