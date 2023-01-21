import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const PageBarWrapper = styled.div`
	padding: 35px 0 35px 35px;
	background-color: #fff;
	height: calc(100vh - 72px);
  width: 250px;
`;

export const PageLink = styled(NavLink)`
	color: ${({ theme }) => theme.subTxtColor};
	text-decoration: none;
	display: flex;
	align-items: center;
	font-weight: 500;
	padding: 5px 0;
	margin: 15px 0;
	
	&:hover {
		transition: all 0.2s, border 0s;
    color: ${({ theme }) => theme.hoverLight};
	}
	
	&.active {
		color: ${({ theme }) => theme.primary};
    border-right: 3px solid ${({ theme }) => theme.primary};
		
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
