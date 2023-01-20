import styled from 'styled-components';

export const StatBlockWrapper = styled.div`
	background-color: #fff;
	padding: 15px 15px 0;
  display: flex;
	flex-direction: column;
	align-items: center;
	flex-grow: 1;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  position: relative;
`;

export const StatBlockTitle = styled.h2`
  font-weight: 500;
  font-size: 18px;
	align-self: flex-start;
	margin: 0 0 10px;
`;

export const StatBlockValue = styled.h4`
	margin: 0;
	font-weight: 500;
  position: relative;
	bottom: 30px;
	font-size: 20px;
	cursor: default;
	user-select: none;
`;
