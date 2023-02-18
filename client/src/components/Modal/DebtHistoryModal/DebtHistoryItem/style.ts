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
  padding: 0 10px 10px 0;
  border-bottom: 1px solid rgba(225, 225, 225, 0.1);
	margin-bottom: 10px;
  animation: ${appear} 0.2s linear;
	
	&:last-child {
		margin-bottom: 0;
	}
`;

export const DebtHistoryDate = styled.span`
	display: block;
	font-size: 13px;
	color: ${({ theme }) => `${theme.subTxtColor}95`};
	text-align: center;
	font-weight: 500;
`;

export const DebtHistoryContent = styled.div`
  display: flex;
`;

export const DebtHistoryMainInfo = styled.div`
	flex-grow: 1;
	margin-left: 5px;
`;

export const DebtHistoryItemTitle = styled.div`
	display: flex;
	justify-content: space-between;
	
	&:nth-child(2) {
		align-self: flex-start;
	}
`;

export const DebtHistorySubInfo = styled.div``;

export const DebtHistoryItemText = styled.p`
	margin: 3px 0;
	font-size: 14px;
`;
