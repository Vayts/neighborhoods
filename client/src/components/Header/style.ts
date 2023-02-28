import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  background-color: #fff;
  padding: 0 30px 0 35px;
  display: flex;
  justify-content: space-between;
  position: sticky;
  z-index: 100;
  top: 0;
  width: 100vw;
  box-sizing: border-box;
  //box-shadow: 0 0 10px #e5e5e5;
  border-bottom: 1px solid #efefef;
`;

export const HeaderLogoWrapper = styled.div`
  display: flex;
	align-items: center;
`;

export const HeaderLogoImg = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
`;

export const HeaderLogoTitle = styled.h2`
	font-weight: 500;
	font-size: 18px;
	margin: 0;
	text-transform: uppercase;
`;
