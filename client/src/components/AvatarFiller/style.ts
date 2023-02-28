import styled from 'styled-components';

interface IAvatarStyleBlock {
	size?: number,
	fz?: number,
}

export const AvatarWrapper = styled.div<IAvatarStyleBlock>`
	width: ${({ size = 50 }) => `${size}px`};
  height: ${({ size = 50 }) => `${size}px`};
	background-color: ${({ theme }) => theme.primary};
  display: flex;
  justify-content: center;
	align-items: center;
	font-size: ${({ fz = 20 }) => `${fz}px`};
	color: #fff;
  margin: 0;
  line-height: 0;
	border-radius: 50%;
	text-transform: capitalize;
	user-select: none;
	cursor: default;
	vertical-align: bottom;
`;
