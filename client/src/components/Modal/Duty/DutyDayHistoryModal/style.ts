import styled from 'styled-components';

export const DutyDayDeleteButton = styled.div`
	flex-grow: 1;
	height: 100%;
  display: flex;
	align-items: center;
  justify-content: flex-end;
`;

export const DutyDayHistoryItem = styled.li``;

export const DutyDayHistoryList = styled.ul`
  list-style: none;
  margin: 0;
  height: auto;
  padding: 15px 0 0 10px;
  overflow-y: scroll;
  border-top: 1px solid #dedede;

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

export const DutyDayHistoryRequest = styled.div`
	width: 35px;
	height: 35px;
	background-color: ${({ theme }) => theme.errorColor};
	border-radius: 50%;
  display: flex;
  justify-content: center;
	align-items: center;
	
	span {
		color: #fff;
		font-size: 16px;
	}
`;

export const DutyDayHistoryWrapper = styled.div`
  padding: 0 20px 0;
  width: 420px;
  height: 500px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
`;

export const DutyDayRightWrapper = styled.div`
	height: 100%;
	width: 20px;
	display: flex;
	justify-content: flex-end;
	align-items: center;
`;
