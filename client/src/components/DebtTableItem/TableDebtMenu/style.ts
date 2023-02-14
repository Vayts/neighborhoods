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

export const TableDebtMenuItem = styled.li`
	padding: 8px 10px;
	user-select: none;
	
	&:hover {
		transition: all 0.2s;
		cursor: inherit;
		background-color: ${({ theme }) => `${theme.primary}10`};
	}
	
	&:last-child {
		color: ${({ theme }) => theme.errorColor};
		font-weight: 500;

    &:hover {
      background-color: ${({ theme }) => `${theme.errorColor}20`};
    }
	}
`;
