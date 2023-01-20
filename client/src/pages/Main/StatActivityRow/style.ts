import styled from 'styled-components';

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
