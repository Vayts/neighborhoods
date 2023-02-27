import styled, { keyframes } from 'styled-components';
import { NavLink } from 'react-router-dom';

const appear = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

export const PageBarWrapper = styled.div`
	padding: 35px 0 15px 15px;
	background-color: #fff;
	height: calc(100vh - 72px);
  min-width: 250px;
	max-width: 250px;
	position: sticky;
	top: 72px;
	flex-grow: 1;
	
	h3 {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		padding-right: 20px;
	}
`;

export const PageLink = styled(NavLink)`
	color: ${({ theme }) => theme.subTxtColor};
	text-decoration: none;
	display: flex;
	align-items: center;
	font-weight: 500;
	padding: 10px 5px 10px 25px;
	border-top-left-radius: 10px;
	border-bottom-left-radius: 10px;
	margin: 5px 0;
	
	&:hover {
		transition: all 0.2s, border 0s;
    color: ${({ theme }) => theme.hoverLight};
		background-color: ${({theme}) => `${theme.subTxtColor}15`};
	}
	
	&.active {
    transition: all 0.2s, border 0s;
		color: ${({ theme }) => theme.primary};
    border-right: 3px solid ${({ theme }) => theme.primary};
    background-color: ${({theme}) => `${theme.primary}20`};
		pointer-events: none;
		
		&:hover {
			cursor: default;
      color: ${({ theme }) => theme.primary};
      border-right: 3px solid ${({ theme }) => theme.primary};
		}
	}
`;

export const PageLinkIcon = styled.span`
	margin-right: 10px;
	
	&:before {
		font-size: 30px;
	}
`;

export const PageLinkText = styled.p`
	margin: 0;
	font-size: 14px;
`;

export const SubPageBar = styled.div`
  animation: ${appear} 0.2s linear;
`;
