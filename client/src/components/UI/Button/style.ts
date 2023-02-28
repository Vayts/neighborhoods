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
	height: ${({ height = '35px' }) => height};
	font-size: ${({ fz = '14px' }) => fz};
	// background-color: ${({ theme }) => `${theme.primary}7`};
	background-color: transparent;
	border: 1px solid ${({ theme }) => theme.primary};
	color: ${({ theme }) => theme.primary};
	border-radius: 3px;
	cursor: pointer;
  position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	
	&:hover {
		transition: all 0.2s;
		background-color: ${({ theme }) => theme.primary};
    color: #fff};
	}
	
	&:disabled {
		border-color: ${({ theme }) => `${theme.disabledBg}30`};
		background-color: ${({ theme }) => `${theme.disabledBg}30`};
		color: ${({ theme }) => `${theme.disabledBg}`};
		cursor: default;
		
		&:hover {
      background-color: ${({ theme }) => `${theme.disabledBg}30`};
		}
	}
`;
