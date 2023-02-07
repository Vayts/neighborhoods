import styled, { keyframes } from 'styled-components';
import { ITableDebtStatus, ITableDebtStyle } from '@src/pages/DebtsPage/DebtsTable/TableDebt/types.ts';

const appear = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const SmallRowWrapper = styled.tr<ITableDebtStyle>`
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

export const SmallRowOpenIcon = styled.span<ITableDebtStyle>`
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

export const SmallRowUser = styled.div`
	display: flex;
	align-items: center;
  justify-content: flex-start;
	
	p {
		margin-left: 10px;
	}
`;

export const SmallRowStatusIcon = styled.i<ITableDebtStatus>`
	height: 100%;
	font-size: 30px;
	flex-grow: 1;
  color: ${({ status, theme }) => (status ? theme.successColor : theme.errorColor)};
`;
