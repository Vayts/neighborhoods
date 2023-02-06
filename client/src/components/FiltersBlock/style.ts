import styled from 'styled-components';

export const FilterBlockWrapper = styled.div`
	background-color: #fff;
	padding: 10px;
	margin-bottom: 10px;
`;

export const FilterTitleWrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const FilterBlockIcon = styled.span`
	cursor: pointer;
	user-select: none;
	
	&:before {
		color: ${({ theme }) => theme.txtColor};
		font-size: 20px;
	}

  &:hover {
    &:before {
      color: ${({ theme }) => theme.primary};
    }
  }
`;

export const FilterContent = styled.div`

`;
