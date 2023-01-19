import React from 'react';
import { InfoLineProps } from '@src/components/InfoLine/types';
import {
	InfoLineDataWrapper,
	InfoLineIcon, InfoLineSubTitle,
	InfoLineTitle,
	InfoLineTitleWrapper, InfoLineValue,
	InfoLineWrapper,
} from '@src/components/InfoLine/style';

export const InfoLine: React.FC<InfoLineProps> = ({ title, subTitle, value, icon, color }) => {
	return (
		<InfoLineWrapper>
			<InfoLineIcon color={color}>
				<span className={icon}/>
			</InfoLineIcon>
			<InfoLineDataWrapper>
				<InfoLineTitleWrapper>
					<InfoLineTitle>{title}</InfoLineTitle>
					<InfoLineValue>{value}</InfoLineValue>
				</InfoLineTitleWrapper>
				<InfoLineSubTitle>{subTitle}</InfoLineSubTitle>
			</InfoLineDataWrapper>
		</InfoLineWrapper>
	);
};
