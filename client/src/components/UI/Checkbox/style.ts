import styled from 'styled-components';
import { ICheckboxStyle } from '@src/components/UI/Checkbox/types';

export const CheckboxWrapper = styled.label<ICheckboxStyle>`
	display: flex;
	align-items: center;
	margin: ${({ margin = '10px 0' }) => margin};
  cursor: pointer;
`;

export const CheckboxInput = styled.input`
	display: none;
`;

export const CheckboxLabel = styled.span`
	cursor: pointer;
	user-select: none;
`;

export const CheckboxIcon = styled.div<ICheckboxStyle>`
  width: 20px;
  height: 20px;
  border: 1px solid ${({ theme, checked }) => (checked ? theme.primary : theme.subTxtColor)};
  display: flex;
  justify-content: center;
  align-items: center;
	margin-right: 10px;
  background-color: ${({ checked, theme }) => (checked ? theme.primary : 'transparent')};
	
	span {
		display: flex;
		align-items: center;
    justify-content: center;
		
    &:before {
      font-size: 12px;
	    color: #fff;
    }
	}
`;
