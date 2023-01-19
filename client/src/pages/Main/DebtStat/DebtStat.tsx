import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@src/hooks/hooks';
import { selectUserMain } from '@src/store/user/selectors';
import { DebtStatStateItem } from '@src/pages/Main/DebtStat/types';
import { useTranslation } from 'react-i18next';
import {
	DebtStatSubTitle,
	DebtStatValue,
	DebtStatWrapper,
} from '@src/pages/Main/DebtStat/style';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { InfoLine } from '@src/components/InfoLine/InfoLine';
import { generateState } from '@helpers/stat.helper';
import { BlockMenuSlider } from '@src/components/BlockMenuSlider/BlockMenuSlider';

export const DebtStat: React.FC = () => {
	const [state, setState] = useState<DebtStatStateItem[]>([]);
	const [active, setActive] = useState<number>(0);
	const user = useAppSelector(selectUserMain);
	const { t } = useTranslation();
	
	useEffect(() => {
		const baseState = generateState(user);
		
		setState([...baseState]);
	}, []);
	
	return (
		state.length ? (
			<DebtStatWrapper>
				<BlockMenuSlider
					title={state[active].title}
					active={active}
					setActive={setActive}
					length={state.length}
				/>
				<div style={{ width: '60%', margin: '0 auto 35px', textAlign: 'center', position: 'relative' }}>
					<CircularProgressbarWithChildren
						value={state[active].value}
						strokeWidth={12}
						styles={buildStyles(
							{
								strokeLinecap: 'round',
								pathColor: state[active].color,
								trailColor: '#EFF2F4',
								backgroundColor: '#3e98c7',
								pathTransitionDuration: 0.5,
							},
						)}
					>
						<DebtStatValue>{`${state[active].value}%`}</DebtStatValue>
						<DebtStatSubTitle>{t('debt')}</DebtStatSubTitle>
					</CircularProgressbarWithChildren>
				</div>
				<InfoLine
					value={state[active].totalValue}
					color={state[active].color}
					title={t('debtsRepaid')}
					icon='icon-event'
					subTitle={state[active].title}
				/>
			</DebtStatWrapper>
		) : null
	);
};
