import React from 'react';
import { BigStatBlockProps } from '@src/components/BigStatBlock/types';
import { BigStatBlockTitle, BigStatBlockWrapper } from '@src/components/BigStatBlock/style';

export const BigStatBlock: React.FC<BigStatBlockProps> = ({ title, children }) => {
	return (
		<BigStatBlockWrapper>
			<BigStatBlockTitle>{title}</BigStatBlockTitle>
			{children}
		</BigStatBlockWrapper>
	);
};
