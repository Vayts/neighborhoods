import styled from 'styled-components';
import { IRadioCircleStyle, IRadioStyle } from '@src/components/UI/Radio/types';

export const RadioWrapper = styled.div<IRadioStyle>`
	margin: ${({ margin = '5px 0' }) => margin};
	cursor: pointer;
	display: flex;
	align-items: center;
`;

export const RadioCircle = styled.div<IRadioCircleStyle>`
  width: 15px;
  height: 15px;
	border-radius: 50%;
  border: 1px solid #6e6e6e;
	margin-right: 5px;
	background-color: ${({ checked, theme }) => (checked ? `${theme.primary}` : 'transparent')};
`;

export const RadioInput = styled.input`
	display: none;
`;

export const RadioLabel = styled.label`
	user-select: none;
  cursor: pointer;
`;
