import styled from 'styled-components';

interface InfoLineIconProps {
	color: string
}

export const InfoLineWrapper = styled.div`
	display: flex;
	margin-bottom: 20px;
	
	&:last-child {
		margin-bottom: 0;
	}
`;

export const InfoLineIcon = styled.div<InfoLineIconProps>`
	width: 36px;
	height: 36px;
	background-color: ${({ color, theme }) => (`${color}50` || `${theme.primary}50`)};
	border-radius: 5px;
	margin-right: 10px;
  display: flex;
	align-items: center;
  justify-content: center;
	
	span {
		&:before {
			font-size: 25px;
			color: ${({ color, theme }) => color || theme};
		}
	}
`;

export const InfoLineDataWrapper = styled.div`
	flex-grow: 1;
`;

export const InfoLineTitle = styled.h4`
	margin: 0;
  cursor: default;
`;

export const InfoLineTitleWrapper = styled.div`
	display: flex;
	justify-content: space-between;
`;

export const InfoLineSubTitle = styled.p`
  margin: 0;
	color: ${({ theme }) => theme.subTxtColor};
  user-select: none;
  cursor: default;
`;

export const InfoLineValue = styled.p`
	margin: 0;
	font-weight: 700;
	cursor: default;
`;
