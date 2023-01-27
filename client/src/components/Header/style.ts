import styled from 'styled-components';

export const HeaderWrapper = styled.div`
	background-color: #fff;
	padding: 0 30px 0 35px;
	display: flex;
	justify-content: space-between;
  position: relative;
	box-sizing: border-box;
`;

export const HeaderLogoWrapper = styled.div`
  display: flex;
	align-items: center;
`;

export const HeaderLogoImg = styled.img`
	width: 42px;
	height: 42px;
	margin-right: 10px;
`;

export const HeaderLogoTitle = styled.h2`
	font-weight: 500;
	font-size: 18px;
	margin: 0;
	text-transform: uppercase;
`;
