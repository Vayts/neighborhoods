import styled from 'styled-components';

export const UserEventItemWrapper = styled.div`
  display: flex;
	flex-grow: 1;
	margin-bottom: 15px;
`;

export const UserEventLeftSide = styled.div`
	margin-right: 10px;
`;

export const UserEventRightSide = styled.div``;

export const UserEventMainInfo = styled.div`
	flex-grow: 1;
`;

export const UserEventTitleWrapper = styled.div`
  display: flex;
	justify-content: space-between;
`;

export const UserEventDate = styled.span`
  display: block;
  font-size: 13px;
  color: ${({ theme }) => `${theme.subTxtColor}95`};
  text-align: center;
  font-weight: 500;
`;

export const UserEventText = styled.p`
  margin: 3px 0;
  font-size: 14px;
`;
