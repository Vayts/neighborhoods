import styled from 'styled-components';

export const TopNeighborsList = styled.ul`
	list-style: none;
	margin: 20px 0 0;
	padding: 0;
	width: 100%;
	height: calc(100% - 40px);
	flex-grow: 1;
`;

export const TopNeighborItem = styled.li`
	display: block;
	width: 100%;
	height: calc(20%);
`;

export const TopNeighborInfoList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
	display: flex;
	align-items: center;
`;

export const TopNeighborInfoItem = styled.li`
	flex-basis: 20%;
	display: flex;
	width: 100%;
	align-items: center;
  font-weight: 500;
	
	&:nth-child(1) {
		flex-basis: 40%;
	}
	
	&:nth-child(2) {
		flex-basis: 30%;
		justify-content: flex-start;
	}
	
	&:nth-child(3) {
		justify-content: center;
		flex-basis: 15%;
	}

  &:nth-child(4) {
    font-size: 20px;
    justify-content: flex-end;
		font-weight: 400;
		flex-basis: 15%;
		color: ${({ theme }) => theme.primary};
  }
`;

export const TopNeighborName = styled.p`
	margin: 0 20px 0 20px;
	font-size: 16px;
	font-weight: 700;
`;

export const TopNeighborhoodName = styled.div`
  display: flex;
  justify-content: center;
	align-items: center;
  background-color: ${({ theme }) => `${theme.secondColor}90`};
  color: #fff;
  margin: 0;
  padding: 0 5px;
  height: 30px;
	cursor: pointer;
  border-radius: 5px;
  font-weight: 300;
	letter-spacing: 1px;
	
	&:hover {
		background-color: ${({ theme }) => theme.secondHover};
		transition: all 0.2s;
	}

  span {
    margin-right: 5px;
    font-size: 15px;
  }
`;
