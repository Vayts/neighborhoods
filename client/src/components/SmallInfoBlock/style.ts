import styled from 'styled-components';

interface SmallIconInterface {
	bgColor: string
}

export const SmallInfoBlockWrapper = styled.div`
  padding: 25px 15px 15px;
  background-color: #fff;
  border-radius: 15px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
	cursor: default;
	
	a {
		align-self: flex-end;
		width: 100%;
		font-size: 14px;
		color: ${({ theme }) => theme.hoverLight};
	}
`;

export const SmallIcon = styled.div<SmallIconInterface>`
	width: 40px;
	height: 40px;
	display: flex;
  justify-content: center;
	align-items: center;
	border-radius: 5px;
	background-color: ${({ bgColor, theme }) => (bgColor || theme.primary)};
  cursor: default;
	
	span:before {
		font-size: 30px;
		color: #fff;
	}
`;

export const SmallTitle = styled.h3`
  font-weight: 400;
  font-size: 16px;
	min-height: 40px;
	margin: 25px 0 15px;
	letter-spacing: 1px;
  color: ${({ theme }) => theme.subTxtColor};
  cursor: default;
`;

export const SmallValue = styled.h2`
  font-weight: 600;
  font-size: 30px;
	margin: 15px 0 5px;
`;

export const SmallSubTitle = styled.p`
  font-weight: 400;
  font-size: 14px;
	color: ${({ theme }) => theme.subTxtColor};
  cursor: default;
	margin: 0 0 25px;
`;

export const LinkWrapper = styled.div`
	text-align: right;
`;
