import styled, { keyframes } from 'styled-components';

const appear = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 0.5;
  }
`;

export const DutyEventItem = styled.abbr`
  position: absolute;
  top: 2px;
  left: 2px;
  z-index: 1;
  text-decoration: none;
	opacity: 0.5;
  animation: ${appear} 0.2s linear;

  &:hover {
    cursor: pointer;
    transition: all 0.2s;
    opacity: 1;
  }
`;

export const DutyCalendarUserWrapper = styled.abbr`
  position: absolute;
	top: 2px;
	left: 2px;
	z-index: 1;
  text-decoration: none;
	opacity: 0.4;
	
	&:hover {
		cursor: pointer;
		transition: all 0.2s;
		opacity: 1;
	}
`;

export const DutyRequestItem = styled.div`
	height: 25px;
	width: 25px;
	border-radius: 50%;
	background-color: ${({ theme }) => theme.errorColor};
	font-size: 22px;
  display: flex;
  justify-content: center;
	align-items: center;
  opacity: 0.4;
	color: #ffffff;
	line-height: 0;

  &:hover {
    cursor: pointer;
    transition: all 0.2s;
    opacity: 1;
  }
`;
