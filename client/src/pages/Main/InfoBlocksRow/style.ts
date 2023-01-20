import styled from 'styled-components';

export const InfoBlocksRowWrapper = styled.div`
	flex-grow: 1;
	display: flex;
`;

export const InfoBlocksList = styled.div`
  display: flex;
  justify-content: space-around;
  flex-basis: 70%;

  & > div {
    flex-basis: 25%;
    margin-right: 20px;
  }
`;
