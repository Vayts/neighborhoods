import styled, { keyframes } from 'styled-components';

const appear = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;
export const DutyCardWrapper = styled.li`
  flex-basis: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
	box-sizing: border-box;
	padding: 0 10px;
	margin-bottom: 20px;
	
	&:first-child {
		padding-left: 0;
	}
	
	&:nth-child(4n - 1) {
		padding-right: 0;
	}
	
	&:nth-child(4n) {
		padding-left: 0;
	}

`;

export const DutyCardContent = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 5px;
  animation: ${appear} 0.2s linear;
  position: relative;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  flex-grow: 1;
`;

export const DutyCardBottomContent = styled.div`
	padding: 10px 15px;
	display: flex;
	justify-content: space-between;
	align-items: center;
`;

export const DutyMenuWrapper = styled.div`
  position: absolute;
	top: 10px;
	right: 10px;
`;

export const DutyCardDetailsButton = styled.p`
	color: ${({ theme }) => theme.subTxtColor};
	margin: 0;
	cursor: pointer;
	&:hover {
		color: ${({ theme }) => theme.primary};
	}
`;
