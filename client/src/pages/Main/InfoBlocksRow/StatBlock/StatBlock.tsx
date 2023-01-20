import React from 'react';
import SemiCircleProgressBar from 'react-progressbar-semicircle';
import { StatBlockTitle, StatBlockValue, StatBlockWrapper } from '@src/pages/Main/InfoBlocksRow/StatBlock/style';
import { useAppSelector } from '@src/hooks/hooks';
import { selectTheme } from '@src/store/base/selectors';
import { THEMES } from '@constants/colors';
import { useTranslation } from 'react-i18next';
import { StatBlockProps } from '@src/pages/Main/InfoBlocksRow/StatBlock/types';

export const StatBlock: React.FC<StatBlockProps> = ({ percentage, max, current }) => {
	const currentTheme = useAppSelector(selectTheme);
	const { t } = useTranslation();
	
	return (
		<StatBlockWrapper>
			<StatBlockTitle>{t('debtReturn')}</StatBlockTitle>
			<SemiCircleProgressBar
				diameter={370}
				percentage={percentage}
				strokeWidth={40}
				showPercentValue={false}
				stroke={THEMES[currentTheme].primary}
			/>
			<StatBlockValue>{`${current}₴/${max}₴`}</StatBlockValue>
		</StatBlockWrapper>
	);
};
