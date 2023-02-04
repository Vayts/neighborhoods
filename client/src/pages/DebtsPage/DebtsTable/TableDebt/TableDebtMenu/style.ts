import styled from 'styled-components';

export const TableDebtMenuList = styled.ul`
	margin: 0;
	padding: 0;
	list-style: none;
`;

export const TableDebtMenuItem = styled.li`
	padding: 8px 10px;
	
	&:hover {
		transition: all 0.2s;
		cursor: pointer;
		background-color: ${({ theme }) => `${theme.primary}10`};
	}
	
	&:last-child {
		color: ${({ theme }) => theme.errorColor};
		font-weight: 500;

    &:hover {
      cursor: pointer;
      background-color: ${({ theme }) => `${theme.errorColor}20`};
    }
	}
`;
