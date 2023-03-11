import styled, { keyframes } from 'styled-components';

const appear = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const DebtHistoryItemWrapper = styled.li`
  padding: 0 10px 0 0;
  border-bottom: 1px solid rgba(225, 225, 225, 0.1);
  animation: ${appear} 0.2s linear;
	
	&:last-child {
		margin-bottom: 0;
	}
`;
