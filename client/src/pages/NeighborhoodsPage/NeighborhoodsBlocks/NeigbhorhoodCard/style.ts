import styled, { keyframes } from 'styled-components';

const appear = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const NCardWrapper = styled.li`
	flex-basis: 33.33%;
  display: flex;
	justify-content: center;
	align-items: center;
	margin: 0;
	
	&:nth-child(3n - 1) {
		& > div {
      margin-right: 30px;
      margin-left: 30px;
		}
	}
`;

export const NCardContent = styled.div`
  width: 100%;
  margin: 0 0 30px 0;
  background-color: #fff;
  padding: 20px 15px;
  border-radius: 5px;
  animation: ${appear} 0.2s linear;
  position: relative;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  flex-grow: 1;

  & > span {
    position: absolute;
    top: 10px;
    right: 20px;

    &:hover {
      &:before {
        color: ${({ theme }) => theme.primary};
        cursor: pointer;
      }
    }

    &:before {
      font-size: 25px;
      color: ${({ theme }) => theme.subTxtColor};
    }
  }
`;

export const NCardTitleWrapper = styled.div`
  display: flex;
`;

export const NCardIcon = styled.span`
	&:before {
		margin-right: 10px;
		font-size: 25px;
		color: ${({ theme }) => theme.primary};
	}
`;

export const NCardTitle = styled.h3`
  font-weight: 500;
  font-size: 19px;
	margin-top: 0;
	margin-bottom: 10px;
`;

export const NCardType = styled.div`
	background-color: ${({ theme }) => `${theme.primary}40`};
	padding: 5px 20px;
	color: ${({ theme }) => theme.primary};;
	border-radius: 5px;
	font-size: 14px;
	margin-left: 10px;
	height: 25px;
  display: flex;
  justify-content: center;
	align-items: center;
	cursor: default;
	user-select: none;
`;

export const NCardDescription = styled.p`
	margin-top: 0;
	min-height: 50px;
	color: ${({ theme }) => theme.subTxtColor};
`;

export const NCardBottomContent = styled.div`
  display: flex;
	justify-content: space-between;
	align-items: center;
`;
