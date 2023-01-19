import React from 'react';
import { SmallInfoBlock } from '@src/components/SmallInfoBlock/SmallInfoBlock';
import { MainPageDivider, MainPageWrapper, SmallInfoBlockWrapper, StatBlockWrapper } from '@src/pages/Main/style';
import { useTranslation } from 'react-i18next';
import { StatBlock } from '@src/components/StatBlock/StatBlock';
import { BigStatBlock } from '@src/components/BigStatBlock/BigStatBlock';
import { useAppSelector } from '@src/hooks/hooks';
import { selectUserMain } from '@src/store/user/selectors';
import { getPercentageNumberFromNumber } from '@helpers/number.helper';
import { DebtStat } from '@src/pages/Main/DebtStat/DebtStat';
import { ChartBlock } from '@src/pages/Main/ChartBlock/ChartBlock';
import { TopNeighborsBlock } from '@src/pages/Main/TopNeighborsBlock/TopNeighborsBlock';

export const Main: React.FC = () => {
	const user = useAppSelector(selectUserMain);
	const { t } = useTranslation();
	
	return (
		<MainPageWrapper>
			<MainPageDivider>
				<SmallInfoBlockWrapper>
					<SmallInfoBlock
						title={t('debtTotal')}
						value={user.totalDebt}
						subTitle={t('debt')}
						icon='icon-event'
						iconBgColor='#64CBF4'
						moreLink='test'
					/>
					<SmallInfoBlock
						title={t('debtInTheAmount')}
						value={user.debtsInTheAmount}
						subTitle={t('hryvnia')}
						icon='icon-analytics'
						iconBgColor='#FF9F38'
						moreLink='test'
					/>
					<SmallInfoBlock
						title={t('yourDebtor')}
						value={user.totalDebtor}
						subTitle={t('debt')}
						icon='icon-event'
						iconBgColor='#E391EA'
						moreLink='test'
					/>
					<SmallInfoBlock
						title={t('yourDebtorInTheAmount')}
						value={user.debtorInTheAmount}
						subTitle={t('hryvnia')}
						icon='icon-analytics'
						iconBgColor='#6C5DD3'
						moreLink='test'
					/>
				</SmallInfoBlockWrapper>
				<StatBlock
					percentage={getPercentageNumberFromNumber(user.debtsRepaid, user.totalDebtsForAllTime)}
					current={user.debtsRepaid}
					max={user.totalDebtsForAllTime}
				/>
			</MainPageDivider>
			<MainPageDivider>
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
			</MainPageDivider>
		</MainPageWrapper>
	);
};
