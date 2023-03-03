import styled from 'styled-components';

export const DutiesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
`;

export const DutiesTitleWrapper = styled.div`
  display: flex;
  align-items: center;
	margin-bottom: 20px;

  span {
    margin-left: 5px;
    font-size: 20px;
    color: ${({ theme }) => theme.subTxtColor};

    &:hover {
      cursor: pointer;
      transition: all 0.2s;
      color: ${({ theme }) => theme.primary};
    }
`;

export const DutiesList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;
