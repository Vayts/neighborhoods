import React from 'react';
import { TooltipProps } from 'recharts';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';
import { useTranslation } from 'react-i18next';
import { CustomTooltipText, CustomTooltipTitle, CustomTooltipWrapper } from './style';

export const CustomTooltip: React.FC<TooltipProps<ValueType, NameType>> = ({ 
	active, 
	payload,
}: TooltipProps<ValueType, NameType>) => {
	const { t } = useTranslation();
	
	if (active && payload && payload.length) {
		if (!payload[0].payload.empty) {
			return (
				<CustomTooltipWrapper>
					<CustomTooltipTitle>{t('debtsRepaid')}</CustomTooltipTitle>
					<CustomTooltipText>{`${payload[0].value} ${t('hryvnia')}`}</CustomTooltipText>
					<CustomTooltipTitle>{t('stillToBeReturned')}</CustomTooltipTitle>
					<CustomTooltipText>{`${payload[1].value} ${t('hryvnia')}`}</CustomTooltipText>
				</CustomTooltipWrapper>
			);
		}
	}
};
