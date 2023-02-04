import React from 'react';
import { TitleItem } from '@src/components/Title/style';
import { ITitle } from '@src/components/Title/types';

export const Title: React.FC<ITitle> = ({ fz, margin, color, children }) => {
	return (
		<TitleItem fz={fz} margin={margin} color={color}>
			{children}
		</TitleItem>
	);
};
