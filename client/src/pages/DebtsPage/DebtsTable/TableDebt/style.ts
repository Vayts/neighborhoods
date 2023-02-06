import styled, { keyframes } from 'styled-components';
import { ITableDebtStatus, ITableDebtStyle } from '@src/pages/DebtsPage/DebtsTable/TableDebt/types';

const appear = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const TableDebtWrapper = styled.tr<ITableDebtStyle>`
  background-color: #fff;
  border-radius: 15px;
  border: 1px solid #f1f1f1;
  width: 100%;
  animation: ${appear} 0.2s linear;
  position: relative;
	
  td {
    border-right: 1px solid #f1f1f1;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
	  transition: all 0.2s, border 0s;
	  padding: 0 10px;
	  

    span {
      max-width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
	  
	  &:not(:first-child) {
      opacity: ${({ shown }) => (shown ? '0' : '1')};
		  border: ${({ shown }) => (shown ? 'none' : '1')};
		  cursor: ${({ shown }) => (shown ? 'default' : 'auto')};
		  user-select: ${({ shown }) => (shown ? 'none' : 'auto')};
    }

    &:first-child {
      width: 20%;
      font-weight: 600;
	    padding-left: 40px;
      border-right: ${({ shown }) => (shown ? 'none' : '1px solid #f1f1f1')};
    }

    &:nth-child(2) {
      width: 40%;
      color: ${({ theme }) => theme.subTxtColor};
      font-size: 14px;
    }

    &:nth-child(3) {
      width: 10%;
      text-align: center;
	    font-weight: 500;
    }

    &:nth-child(4) {
      width: 15%;
	    text-align: left;
    }

    &:nth-child(5) {
      width: 10%;
	    text-align: center;
	    color: ${({ theme }) => theme.subTxtColor};
    }
	  
	  &:nth-child(6) {
      text-align: center;
      text-overflow: clip;
      overflow: hidden;
	  }
  }
`;

export const TableDebtOpenIcon = styled.span<ITableDebtStyle>`
  position: absolute;
  top: calc(50%);
  left: 5px;
  transform: ${({ shown }) => (shown ? 'translateY(-50%) rotate(0)' : 'translateY(-50%) rotate(-90deg)')};
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;

  &:hover {
    &:before {
      color: ${({ theme }) => theme.primary};
    }
  }

  &:before {
    font-size: 40px;
    color: ${({ theme }) => theme.subTxtColor};
  }
`;

export const TableDebtStatusIcon = styled.i<ITableDebtStatus>`
	height: 100%;
	font-size: 30px;
	flex-grow: 1;
  color: ${({ status, theme }) => (status ? theme.successColor : theme.errorColor)};
`;

export const TableDebtUser = styled.div`
	display: flex;
	align-items: center;
  justify-content: flex-start;
	
	p {
		margin-left: 10px;
	}
`;

export const TableFullContentRow = styled.tr<ITableDebtStyle>`
	transition: all 0.2s;
	background-color: #fff;
	opacity: ${({ shown }) => (shown ? '1' : '0')};
  border: 1px solid #f1f1f1;
  position: relative;

  td {
	  transition: all 0.2s;
    padding: ${({ shown }) => (shown ? '0 20px' : '0')};
  }
`;

export const TableSplitter = styled.tr`
	height: 10px;
	background-color: transparent;
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
