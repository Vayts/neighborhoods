import styled from 'styled-components';

export const MainPageWrapper = styled.div`
  flex-grow: 1;
`;

export const MainPageDivider = styled.div`
  display: flex;
	margin-bottom: 25px;
`;

export const SmallInfoBlockWrapper = styled.div`
  display: flex;
	justify-content: space-around;
	flex-basis: 70%;

  & > div {
    flex-basis: 25%;
    margin-right: 20px;
  }
`;

export const StatBlockWrapper = styled.div`
  display: flex;
	flex-grow: 1;

  & > div {
    flex-basis: 25%;
    margin-right: 20px;
  }

  & > div:nth-child(2) {
		flex-basis: 30%;
  }
	
	& > div:last-child {
		flex-grow: 1;
		margin-right: 0;
	}
`;
