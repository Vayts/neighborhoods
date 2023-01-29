import styled from 'styled-components';

interface IButtonStyle {
	margin?: string,
	padding?: string,
	width?: string,
	height?: string,
	fz?: string,
}

export const ButtonItem = styled.button<IButtonStyle>`
	margin: ${({ margin = '0' }) => margin};
	padding: ${({ padding = '10px 20px' }) => padding};
	width: ${({ width = 'auto' }) => width};
	height: ${({ height = 'auto' }) => height};
	font-size: ${({ fz = '14px' }) => fz};
	background-color: ${({ theme }) => theme.primary};
	border: none;
	color: #fff;
	border-radius: 5px;
	cursor: pointer;
  position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	
	&:hover {
		transition: all 0.2s;
		background-color: ${({ theme }) => theme.hover};
	}
	
	&:disabled {
		background-color: ${({ theme }) => theme.disabledBg};
		cursor: default;
	}
`;
