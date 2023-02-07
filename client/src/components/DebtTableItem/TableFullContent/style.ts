import styled from 'styled-components';
import { ITableDebtStyle } from '@src/types/debt.types';

export const TableFullRow = styled.tr<ITableDebtStyle>`
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
