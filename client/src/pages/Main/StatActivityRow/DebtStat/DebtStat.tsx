import React, { useState } from 'react';
import { useAppSelector } from '@src/hooks/hooks';
import { useTranslation } from 'react-i18next';
import {
	DebtStatSubTitle,
	DebtStatValue,
	DebtStatWrapper,
} from '@src/pages/Main/StatActivityRow/DebtStat/style';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { InfoLine } from '@src/components/InfoLine/InfoLine';
import { BlockMenuSlider } from '@src/components/BlockMenuSlider/BlockMenuSlider';
import { selectDashboardStatActivity } from '@src/store/dashboard/selectors';
import { getPercentageNumberFromNumber } from '@helpers/number.helper';

export const DebtStat: React.FC = () => {
	const stats = useAppSelector(selectDashboardStatActivity).stats;
	const [active, setActive] = useState<number>(0);
	const { t } = useTranslation();
	
	return (
		stats.length ? (
			<DebtStatWrapper>
				<BlockMenuSlider
					title={t(stats[active].titleKey)}
					active={active}
					setActive={setActive}
					length={stats.length}
				/>
				<div style={{ width: '64%', margin: '0 auto 35px', textAlign: 'center', position: 'relative' }}>
					<CircularProgressbarWithChildren
						value={getPercentageNumberFromNumber(stats[active].returnedDebts, stats[active].receivedDebts)}
						strokeWidth={12}
						styles={buildStyles(
							{
								strokeLinecap: 'round',
								pathColor: stats[active].color,
								trailColor: '#EFF2F4',
								backgroundColor: '#3e98c7',
								pathTransitionDuration: 0.5,
							},
						)}
					>
						<DebtStatValue>{`${getPercentageNumberFromNumber(stats[active].returnedDebts, stats[active].receivedDebts)}%`}</DebtStatValue>
						<DebtStatSubTitle>{t('debt')}</DebtStatSubTitle>
					</CircularProgressbarWithChildren>
				</div>
				<InfoLine
					value={stats[active].returnedDebts}
					color={stats[active].color}
					title={t('debtsRepaid')}
					icon='icon-event'
					subTitle={t(stats[active].titleKey)}
				/>
			</DebtStatWrapper>
		) : null
	);
};
