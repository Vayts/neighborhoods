import styled from 'styled-components';
import { ITitle } from '@src/components/Title/types';

export const TitleItem = styled.h3<ITitle>`
  font-weight: 500;
  font-size: ${({ fz = '19px' }) => fz};
	margin: ${({ margin = '15px 0' }) => margin};
	color: ${({ color = 'inherit' }) => color};
	height: ${({ height = 'auto' }) => height};
	text-align: ${({ align = 'left' }) => align};
`;
