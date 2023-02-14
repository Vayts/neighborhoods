import styled, { keyframes } from 'styled-components';

export interface IDatePickerStyle {
	width?: string,
	height?: string,
	fz?: string,
	padding?: string,
	margin?: string,
}

const appear = keyframes`
  from {
   	opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const DatePickerWrapper = styled.div<IDatePickerStyle>`
  margin: ${({ margin = '10px 0' }) => margin};
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const DatePickerContent = styled.div`
  width: 100%;
  position: relative;
`;

export const DatePickerIcon = styled.span`
  right: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 22px;
  color: #989898;
  cursor: pointer;
	user-select: none;

  &:active {
    color: #1d1d1d;
  }
`;

export const DatePickerLabel = styled.label`
	display: inline-block;
  font-weight: 500;
  font-size: 13px;
  margin-bottom: 10px;
`;

export const DatePickerInput = styled.input<IDatePickerStyle>`
  border: 1px solid rgba(23, 78, 130, 0.15);
  border-radius: 3px;
  padding: ${({ padding = '10px 15px' }) => padding};
  width: ${({ width = 'auto' }) => width};
  height: ${({ height = 'auto' }) => height};
  font-size: ${({ fz = '15px' }) => fz};
  caret-color: transparent;

  &:focus {
    outline: 1px solid rgba(29, 29, 29, 0.39);
  }

  &::placeholder {
    color: #0D3C6D80;
    user-select: none;
  }
	
	&:disabled {
		background-color: transparent;
	}
`;

interface ICalendar {
	isOpen: boolean,
}

export const CalendarWrapper = styled.div<ICalendar>`
	bottom: 50%;
	right: 10px;
  position: absolute;
	z-index: 10;
	display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  animation: ${appear} 0.1s linear;
	max-width: 300px;
	max-height: 300px;
`;
