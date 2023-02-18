import styled from 'styled-components';

interface ITableDebtMenu {
	isLoading: boolean
}

export const TableDebtMenuList = styled.ul<ITableDebtMenu>`
	margin: 0;
	padding: 0;
	list-style: none;
	cursor: ${({ isLoading }) => (isLoading ? 'default' : 'pointer')};
  position: relative;
`;

interface IDebtMenuStyle {
	isDelete?: boolean;
}

export const TableDebtMenuItem = styled.li<IDebtMenuStyle>`
	padding: 8px 10px;
	user-select: none;
  font-weight: ${({ isDelete }) => (isDelete ? '500' : '400')};
	color: ${({ isDelete, theme }) => (isDelete ? `${theme.errorColor}` : 'inherit')};;
	
	&:hover {
		transition: all 0.2s;
		cursor: inherit;
		color: ${({ isDelete, theme }) => (isDelete ? theme.errorColor : 'inherit')};
		background-color: ${({ theme, isDelete }) => (isDelete ? `${theme.errorColor}10` : `${theme.primary}10`)};
	}
`;
