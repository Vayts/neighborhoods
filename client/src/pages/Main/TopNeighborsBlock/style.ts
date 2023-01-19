import styled from 'styled-components';

export const TopNeighborsList = styled.ul`
	list-style: none;
	margin: 20px 0 0;
	padding: 0 15px 0 0;
	height: 100%;
	width: 100%;
	flex-grow: 1;
`;

export const TopNeighborItem = styled.li`
	display: block;
	width: 100%;
	margin-bottom: 25px;
`;

export const TopNeighborInfoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
	display: flex;
`;

export const TopNeighborInfoItem = styled.li`
	flex-basis: 25%;
	display: flex;
	width: 100%;
	flex-grow: 1;
	align-items: center;
  font-weight: 600;
	
	&:nth-child(1) {
		flex-basis: 35%;
		
	}
	
	&:nth-child(2) {
		justify-content: flex-start;
	}
	
	&:nth-child(3) {
		justify-content: flex-end;
	}

  &:nth-child(4) {
    font-size: 20px;
    justify-content: flex-end;
		font-weight: 400;
		color: ${({ theme }) => theme.primary};
  }
`;

export const TopNeighborName = styled.p`
	margin: 0 0 0 20px;
	font-size: 16px;
	font-weight: 700;
`;
