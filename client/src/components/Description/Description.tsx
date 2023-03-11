import React from 'react';
import { IDescription } from '@src/components/Description/types';
import { DescriptionItem } from '@src/components/Description/style';

export const Description: React.FC<IDescription> = ({ fz, margin, color, children, height, align }) => {
	return (
		<DescriptionItem fz={fz} margin={margin} color={color} height={height} align={align}>
			{children}
		</DescriptionItem>
	);
};
