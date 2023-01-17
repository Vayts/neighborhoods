import React from 'react';
import { SmallInfoBlock } from '@src/components/SmallInfoBlock/SmallInfoBlock';
import { InfoBlocksWrapper } from '@src/pages/Main/style';
import { useTranslation } from 'react-i18next';

export const Main: React.FC = () => {
	const { t } = useTranslation();
	
	return (
		<InfoBlocksWrapper>
			<SmallInfoBlock
				title={t('debtTotal')}
				value={403}
				subTitle={t('debt')}
				icon='icon-event'
				iconBgColor='#64CBF4'
				moreLink='test'
			/>
			<SmallInfoBlock
				title={t('debtInTheAmount')}
				value={40345}
				subTitle={t('hryvnia')}
				icon='icon-analytics'
				iconBgColor='#FF9F38'
				moreLink='test'
			/>
			<SmallInfoBlock
				title={t('yourDebtor')}
				value={12}
				subTitle={t('debt')}
				icon='icon-event'
				iconBgColor='#E391EA'
				moreLink='test'
			/>
			<SmallInfoBlock
				title={t('yourDebtorInTheAmount')}
				value={4032}
				subTitle={t('hryvnia')}
				icon='icon-analytics'
				iconBgColor='#6C5DD3'
				moreLink='test'
			/>
		</InfoBlocksWrapper>
	);
};
