import React from 'react';
import { IAvatarProps } from '@src/components/AvatarFiller/types';
import { AvatarWrapper } from '@src/components/AvatarFiller/style';

export const AvatarFiller: React.FC<IAvatarProps> = ({ size, text, fz }) => {
	return (
		<AvatarWrapper fz={fz} size={size}>
			{text.slice(0, 1)}
		</AvatarWrapper>
	);
};
