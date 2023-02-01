import styled, { keyframes } from 'styled-components';
import { ITableDebtStatus, ITableDebtStyle } from '@src/pages/NeighborhoodCurrentPage/DebtsTable/TDebt/types';

const appear = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const TDebtWrapper = styled.li`
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  position: relative;
  animation: ${appear} 0.2s linear;
  margin-top: 15px;
`;

export const TDebtIcon = styled.span<ITableDebtStyle>`
  position: absolute;
  top: 30px;
  left: 10px;
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

export const TDebtShortContent = styled.ul<ITableDebtStyle>`
	display: flex;
  align-items: center;
  list-style: none;
  margin: 0;
  padding: 0 0 0 20px;
  border-bottom: ${({ shown }) => (shown ? '1px solid #f5f5f5' : 'none')};
	

  li {
    border-right: 1px solid #f5f5f5;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60px;
    transition: all 0.2s, border-right 0s;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
	  cursor: default;
	  user-select: none;
  }

  li + li:not(:first-child) {
    opacity: ${({ shown }) => (shown ? '0' : '1')};
  }

  li:first-child {
    flex-basis: 15%;
    font-weight: 600;
    padding-left: 30px;
    justify-content: flex-start;
    border-right: ${({ shown }) => (shown ? 'none' : '1px solid #f5f5f5')};
  }

  li:nth-child(2) {
    flex-basis: 35%;
    font-size: 14px;
    width: 100px;
    justify-content: flex-start;
    color: ${({ theme }) => theme.subTxtColor};
  }

  li:nth-child(3) {
    flex-basis: 15%;
    font-weight: 500;
    font-size: 20px;
    display: flex;
    padding: 0 10px;
  }

  li:nth-child(4) {
    flex-basis: 20%;

    display: flex;
    align-items: center;

    p {
      margin: 0 0 0 10px;
      font-weight: 600;
    }
  }

  li:nth-child(5) {
    flex-basis: 10%;
    display: flex;
    justify-content: center;
  }

  li:last-child {
    flex-basis: 10%;
    border-right: none;
    display: flex;
    padding: 0;
  }
`;

export const TDebtSmallDescription = styled.span`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  text-align: left;
`;

export const TDebtStatusIcon = styled.span<ITableDebtStatus>`
  &:before {
    font-size: 30px;
    color: ${({ status, theme }) => (status ? theme.successColor : theme.errorColor)};
  }
`;

export const TDebtFullContent = styled.div`
	padding: 20px 20px 10px;
	display: flex;
	
	div:first-child {
    display: flex;
		align-self: flex-start;
		margin-right: 5px;
		
		div {
		
		}
	}
`;

export const TDebtSubContent = styled.div`
	flex-grow: 1;
`;

export const TDebtMainInfo = styled.div`
  justify-content: space-between;
`;

export const TDebtUserName = styled.p`
	margin: 0;
	font-weight: 700;
	font-size: 17px;
`;

export const TDebtInfoWrapper = styled.div`
	margin-top: 15px;
`;

export const TDebtDescription = styled.p`
	color: ${({ theme }) => theme.subTxtColor};
	margin: 0 0 5px;
	font-size: 16px;
`;

export const TDebtControls = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
	
	span {
		margin-left: 10px;
		
		&:hover {
			cursor: pointer;
			&:before {
				color: ${({ theme }) => theme.primary};
			}
		}
		&:before {
			font-size: 30px;
			color: ${({ theme }) => theme.subTxtColor};
		}
	}
`;

export const TDebtDates = styled.div`
	align-self: flex-start;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.2s;
  font-size: 16px;

  & > span {
    margin: 0 15px;
    &:before {
      font-size: 20px;
      color: ${({ theme }) => theme.subTxtColor};
    }
  }
	
  p {
    margin: 0;
  }

  div {
    display: flex;
    align-items: center;

    span {
      &:before {
        font-size: 20px;
      }
    }

    &:first-child {
      color: ${({ theme }) => theme.subTxtColor};
    }

    &:last-child {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

export const TDebtSmallTitle = styled.h6`
	font-size: 16px;
	margin: 10px 0 5px;
	font-weight: 500;
`;

export const TDebtBottomContent = styled.div`
	flex-basis: 100%;
  display: flex;
	align-items: center;
	justify-content: flex-end;
	margin: 10px 0;
`;

export const TDebtStatus = styled.p<ITableDebtStatus>`
	color: ${({ status }) => (status ? 'green' : 'red')};
	margin: 0 0 5px;
`;

export const TDebtValue = styled.span`
	font-size: 20px;
	font-weight: 500;
  color: ${({ theme }) => theme.subTxtColor};
`;
