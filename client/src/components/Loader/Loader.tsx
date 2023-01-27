import React, { FC } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { ILoader } from '@src/components/Loader/types';
import { LoaderWrapper } from './style';

export const Loader: FC<ILoader> = ({ color, size }) => (
	<LoaderWrapper>
		<ClipLoader color={color || '#475895'} loading size={size || 100} />
	</LoaderWrapper>
);
