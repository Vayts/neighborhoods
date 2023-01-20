import React, { useState } from 'react';
import { ChartBlockWrapper, ChartContentWrapper } from '@src/pages/Main/StatActivityRow/ChartBlock/style';
import {
	BarChart,
	Bar,
	Tooltip,
	ResponsiveContainer, XAxis,
} from 'recharts';
import { BlockMenuSlider } from '@src/components/BlockMenuSlider/BlockMenuSlider';
import { useAppSelector } from '@src/hooks/hooks';
import { useTranslation } from 'react-i18next';
import { CustomTooltip } from '@src/components/CustomTooltip/CustomTooltip';
import { selectDashboardStatActivity } from '@src/store/dashboard/selectors';
import { InfoLine } from '@src/components/InfoLine/InfoLine';
import { countTotalDebtValue } from '@helpers/stat.helper';

export const ChartBlock: React.FC = () => {
	const activity = useAppSelector(selectDashboardStatActivity).activity;
	const [active, setActive] = useState<number>(0);
	const { t } = useTranslation();
	
	const renderCustomAxisTick = ({ x, y, payload }) => {
		return <text x={x} y={y + 25} fill="#666" textAnchor="middle" dy={-6}>{t(payload.value)}</text>;
	};
	
	return (
		activity.length ? (
			<ChartBlockWrapper>
				<BlockMenuSlider title={t(activity[active].titleKey)} active={active} length={activity.length} setActive={setActive}/>
				<ChartContentWrapper>
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							width={500}
							height={300}
							data={activity[active].valueArr}
							margin={{
								top: 20,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<XAxis
								dataKey="nameKey"
								strokeWidth={0}
								tick={renderCustomAxisTick}
							/>
							<Tooltip wrapperStyle={{ outline: 'none' }} cursor={{ fill: '#f5f5f5' }} content={<CustomTooltip/>}/>
							<Bar dataKey="debtsRepaid" stackId="a" fill={activity[active].color}/>
							<Bar dataKey="debtsActive" stackId="a" fill="#E8EBED"/>
						</BarChart>
					</ResponsiveContainer>
				</ChartContentWrapper>
				<InfoLine
					value={countTotalDebtValue(activity[active].valueArr, 'debtsRepaid')}
					color={activity[active].subColor}
					title={t('paid')}
					icon='icon-event'
					subTitle={t('hryvnia')}
				/>
				<InfoLine
					value={countTotalDebtValue(activity[active].valueArr, 'debtsActive')}
					color={activity[active].color}
					title={t('remains')}
					icon='icon-dashboard'
					subTitle={t('hryvnia')}
				/>
			</ChartBlockWrapper>
		) : null
	);
};
