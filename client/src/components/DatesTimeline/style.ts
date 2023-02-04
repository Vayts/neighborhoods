import styled from 'styled-components';

export const DatesWrapper = styled.div`
  display: flex;
	align-items: center;
	justify-content: flex-end;
`;

export const DatesContentSplitter = styled.div`
	display: flex;
	align-items: center;
	margin-right: 5px;
	
	&:last-child {
		margin-right: 0;
	}
	
	&:first-child {
		color: ${({ theme }) => theme.subTxtColor};
	}
	
	&:last-child {
    color: ${({ theme }) => theme.primary};
	}
`;

export const DatesIcon = styled.span`
	font-size: 22px;
`;

export const DatesText = styled.p`
	margin: 0;
`;

export const DatesArrow = styled.span`
	font-size: 25px;
  color: ${({ theme }) => theme.subTxtColor};
`;
