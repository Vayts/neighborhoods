import styled from 'styled-components';

export const DebtsWrapper = styled.div`
  width: content-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  height: 100%;
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
`;

export const DebtsRightWrapper = styled.div`
  flex-basis: 78%;
	height: 100%;
`;
