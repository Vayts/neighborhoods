import React from 'react';
import { InfoBlocksList, InfoBlocksRowWrapper } from '@src/pages/Main/InfoBlocksRow/style';
import { SmallInfoBlock } from '@src/components/SmallInfoBlock/SmallInfoBlock';
import { StatBlock } from '@src/pages/Main/InfoBlocksRow/StatBlock/StatBlock';
import { getPercentageNumberFromNumber } from '@helpers/number.helper';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '@src/hooks/hooks';
import { selectDebtsInfo } from '@src/store/dashboard/selectors';

export const InfoBlocksRow: React.FC = () => {
	const debtsInfo = useAppSelector(selectDebtsInfo);
	const { t } = useTranslation();
	
	return (
		<InfoBlocksRowWrapper>
			<InfoBlocksList>
				<SmallInfoBlock
					title={t('debtTotal')}
					value={debtsInfo.debt.counter}
					subTitle={t('debt')}
					icon='icon-event'
					iconBgColor='#64CBF4'
					moreLink='test'
				/>
				<SmallInfoBlock
					title={t('debtInTheAmount')}
					value={debtsInfo.debt.value}
					subTitle={t('hryvnia')}
					icon='icon-analytics'
					iconBgColor='#FF9F38'
					moreLink='test'
				/>
				<SmallInfoBlock
					title={t('yourDebtor')}
					value={debtsInfo.debtor.counter}
					subTitle={t('debt')}
					icon='icon-event'
					iconBgColor='#E391EA'
					moreLink='test'
				/>
				<SmallInfoBlock
					title={t('yourDebtorInTheAmount')}
					value={debtsInfo.debtor.value}
					subTitle={t('hryvnia')}
					icon='icon-analytics'
					iconBgColor='#6C5DD3'
					moreLink='test'
				/>
			</InfoBlocksList>
			<StatBlock
				percentage={getPercentageNumberFromNumber(debtsInfo.total.returned, debtsInfo.total.totalValue)}
				current={debtsInfo.total.returned}
				max={debtsInfo.total.totalValue}
			/>
		</InfoBlocksRowWrapper>
	);
};
