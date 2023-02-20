import styled from 'styled-components';

export const DebtsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const DebtPageTitleWrapper = styled.div`
	display: flex;
	align-items: center;
	
	span {
		margin-left: 5px;
		font-size: 20px;
		color: ${({ theme }) => theme.subTxtColor};

    &:hover {
	    cursor: pointer;
	    transition: all 0.2s;
      color: ${({ theme }) => theme.primary};
    }
	}
	

`;

export const DebtsControls = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
`;

export const DebtsContent = styled.div`
	margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-self: stretch;
  flex-grow: 1;
`;

export const DebtsRightWrapper = styled.div`
  flex-basis: 80%;
  height: 100%;
  position: relative;
  flex-grow: 1;
  align-self: stretch;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
`;
