import styled from 'styled-components';

export const DebtorsWrapper = styled.div`
  width: content-box;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  position: relative;
  height: 100%;
`;

export const DebtorsPageTitleWrapper = styled.div`
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

export const DebtorsControls = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;
`;

export const DebtorsContent = styled.div`
	margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const DebtorsRightWrapper = styled.div`
  flex-basis: 78%;
	height: 100%;
`;
