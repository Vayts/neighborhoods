import styled from 'styled-components';
import { ITableDebtStatus } from '@src/types/debt.types';

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

export const TableDebtInfoWrapper = styled.div`
	padding-bottom: 20px;
	margin-top: 15px;
`;

export const TableDebtDescription = styled.p`
	margin: 0 0 5px;
	font-size: 16px;
`;

export const TableDebtControl = styled.div`
  position: absolute;
	top: 5px;
	right: 20px;
`;

export const TableDebtDates = styled.div`
  font-size: 16px;
`;

export const TableDebtSmallTitle = styled.h6`
	font-size: 16px;
	margin: 10px 0 5px;
	font-weight: 500;
`;

export const TableDebtStatus = styled.p<ITableDebtStatus>`
  color: ${({ theme }) => theme.subTxtColor};
	margin: 0 0 5px;
`;

export const TableDebtValue = styled.span`
	font-size: 24px;
	font-weight: 600;
`;
