import React, { useEffect, useState } from 'react';
import { ChartBlockWrapper, ChartContentWrapper } from '@src/pages/Main/ChartBlock/style';
import {
	BarChart,
	Bar,
	Tooltip,
	ResponsiveContainer, XAxis,
} from 'recharts';
import { BlockMenuSlider } from '@src/components/BlockMenuSlider/BlockMenuSlider';
import { useAppSelector } from '@src/hooks/hooks';
import { selectUserMain } from '@src/store/user/selectors';
import { useTranslation } from 'react-i18next';
import { InfoLine } from '@src/components/InfoLine/InfoLine';
import { generateChartState } from '@helpers/stat.helper';
import { CustomTooltip } from '@src/components/CustomTooltip/CustomTooltip';

export const ChartBlock: React.FC = () => {
	const [active, setActive] = useState<number>(0);
	const [state, setState] = useState([]);
	const user = useAppSelector(selectUserMain);
	const { t } = useTranslation();
	
	useEffect(() => {
		setState([...generateChartState(user)]);
	}, []);
	return (
		state.length ? (
			<ChartBlockWrapper>
				<BlockMenuSlider title={state[active].title} active={active} length={state.length} setActive={setActive}/>
				<ChartContentWrapper>
					<ResponsiveContainer width="100%" height="100%">
						<BarChart
							width={500}
							height={300}
							data={state[active].value}
							margin={{
								top: 20,
								right: 30,
								left: 20,
								bottom: 5,
							}}
						>
							<XAxis dataKey="name" strokeWidth={0}/>
							<Tooltip wrapperStyle={{ outline: 'none' }} cursor={{ fill: '#f5f5f5' }} content={<CustomTooltip/>}/>
							<Bar dataKey="debtsRepaid" stackId="a" fill={state[active].color}/>
							<Bar dataKey="debtsReceived" stackId="a" fill="#E8EBED"/>
						</BarChart>
					</ResponsiveContainer>
				</ChartContentWrapper>
				<InfoLine
					value={state[active].subValue}
					color={state[active].subColor}
					title={state[active].subTitle}
					icon='icon-event'
					subTitle={t('hryvnia')}
				/>
				<InfoLine
					value={state[active].subGoal}
					color={state[active].color}
					title={t('stillToBeReturned')}
					icon='icon-dashboard'
					subTitle={t('hryvnia')}
				/>
			</ChartBlockWrapper>
		) : null
	);
};
