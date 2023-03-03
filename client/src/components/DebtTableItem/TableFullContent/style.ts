import styled, { keyframes } from 'styled-components';
import { ITableDebtStyle } from '@src/types/debt.types';

const appear = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const TableFullRow = styled.tr<ITableDebtStyle>`
	transition: all 0.2s;
	background-color: #fff;
	opacity: ${({ shown }) => (shown ? '1' : '0')};
  animation: ${appear} 0.2s linear;
  position: relative;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.05);

  td {
	  transition: all 0.2s;
    padding: ${({ shown }) => (shown ? '0 20px' : '0')};
  }
`;

export const TableDebtFullContent = styled.div`
	display: flex;
	padding: 30px 0 10px;
	
	& > div:first-child {
    display: flex;
		align-self: flex-start;
		margin-right: 10px;
	}
`;

export const TableDebtSubContent = styled.div`
	flex-grow: 1;
`;

export const TableDebtMainInfo = styled.div`
	display: flex;
  justify-content: space-between;
	align-items: flex-start;
`;

export const TableDebtUserName = styled.p`
	margin: 0;
	font-weight: 700;
	font-size: 17px;
`;

export const TableDebtUserNameWrapper = styled.div`
	display: flex;
`;

export const TableDebtorsSign = styled.div`
	margin-left: 5px;
	background-color: ${({ theme }) => theme.secondColor};
	color: #fff;
	font-size: 12px;
	padding: 3px 5px;
	border-radius: 5px;
	cursor: default;
`;

export const TableDebtInfoWrapper = styled.div`
	margin: 10px 0;
`;
export const TableDebtControl = styled.div`
  position: absolute;
	top: 5px;
	right: 20px;
`;

export const TableDebtDates = styled.div`
  font-size: 16px;
`;

export const TableDebtValueWrapper = styled.div`
	align-items: flex-end;
`;

export const TableDebtValue = styled.span`
	font-size: 24px;
	font-weight: 600;
`;

export const TableDebtNewValue = styled.span`
	font-weight: 500;
`;

export const TableDebtValueIcon = styled.span`
	font-size: 20px;
	margin: 0 5px;
	align-self: flex-end;
	line-height: 0.5;
`;

export const TableDebtBottomContent = styled.div`
	display: flex;
	justify-content: flex-end;
`;
