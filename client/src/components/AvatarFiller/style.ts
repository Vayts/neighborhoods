import styled from 'styled-components';

interface IAvatarStyleBlock {
	size?: number,
	fz?: number,
}

export const AvatarWrapper = styled.div<IAvatarStyleBlock>`
	width: ${({ size = 50 }) => `${size}px`};
  height: ${({ size = 50 }) => `${size}px`};
	background-color: ${({ theme }) => theme.primary};
	font-size: ${({ fz = 20 }) => `${fz}px`};
	color: #fff;
  margin: 0;
	border-radius: 50%;
	text-transform: capitalize;
	user-select: none;
	cursor: inherit;
	vertical-align: bottom;
  position: relative;
	z-index: 1;
	
	span {
    font-size: ${({ fz = 20 }) => `${fz}px`};
    position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		cursor: inherit;
	}
`;
