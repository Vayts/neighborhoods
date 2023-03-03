import styled from 'styled-components';

export const DutyMarkModalWrapper = styled.div`
	min-width: 400px;
`;

export const DutyMarkMenu = styled.ul`
	margin: 10px 0 0;
	padding: 0;
	list-style: none;
`;

export const DutyMarkMenuItem = styled.li`
  text-align: center;
  border-bottom: 1px solid #e3e3e3;
	padding: 10px 0;
	
	&:hover {
    background-color: #F9F8F8;
    cursor: pointer;
	}

  &:last-child {
    font-weight: 500;
    color: ${({ theme }) => `${theme.errorColor}`};
    border-bottom: none;
  }
`;
