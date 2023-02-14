import styled from 'styled-components';

export const DebtHistoryWrapper = styled.div`
	padding: 0 15px 20px;
	width: 400px;
	height: 500px;
	overflow: hidden;
	position: relative;
`;

export const DebtHistoryList = styled.ul`
  max-height: 500px;
  list-style: none;
  margin: 0;
  padding: 15px 0 0;
  overflow-y: scroll;

  /* width */

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Handle */

  ::-webkit-scrollbar-thumb {
	  width: 5px;
    background: ${({ theme }) => theme.primary};
	  border-radius: 5px;
  }

  /* Handle on hover */

  ::-webkit-scrollbar-thumb:hover {
    background: ${({ theme }) => theme.hover};
  }
`;

export const DebtHistoryNoContent = styled.div`
  position: absolute;
	top: 50%;
	left: 50%;
	text-align: center;
	transform: translate(-50%,-50%);
	padding-bottom: 30px;
	color: ${({ theme }) => theme.subTxtColor};
	user-select: none;
`;
