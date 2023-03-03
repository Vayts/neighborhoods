import styled from 'styled-components';

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
