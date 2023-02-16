import styled from 'styled-components';
import { IDescription } from '@src/components/Description/types';

export const DescriptionItem = styled.p<IDescription>`
  font-size: ${({ fz = '14px' }) => fz};
  margin: ${({ margin = '15px 0' }) => margin};
  color: ${({ color, theme }) => color || theme.subTxtColor};
  height: ${({ height = 'auto' }) => height};
`;
