import styled from 'styled-components';

export const NeighborhoodsPageWrapper = styled.div`
	width: content-box;
	display: flex;
	flex-direction: column;
  align-items: stretch;
	position: relative;
	height: 100%;
`;

export const NeighborhoodsControls = styled.div`
  display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const NeighborhoodAddButton = styled.div`
	background-color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: center;
	align-items: center;
	width: 40px;
	height: 40px;
	border: 2px solid ${({ theme }) => theme.primary};
	border-radius: 10px;
	cursor: pointer;
	transition: all 0.2s;
	
	&:hover {
		background-color: transparent;
		
		span {
      transition: all 0.2s;
			&:before {
        color: ${({ theme }) => theme.primary};
			}
		}
	}
`;

export const NeighborhoodAddIcon = styled.span`
	&:before {
		font-size: 25px;
		display: inline-block;
    transform: rotate(45deg);
		color: #fff;
	}
`;

export const NeighborhoodsTitle = styled.h3`
  font-weight: 500;
  font-size: 19px;
`;
