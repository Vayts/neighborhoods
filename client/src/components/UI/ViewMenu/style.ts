import styled from 'styled-components';
import { IViewMenuStyle } from '@src/components/UI/ViewMenu/types';

export const ViewMenuWrapper = styled.div`
	display: flex;
	background-color: #fff;
	border-radius: 10px;
`;

export const ViewMenuItem = styled.div<IViewMenuStyle>`
	transition: all 0.2s;
	background-color: ${({ isActive }) => (isActive ? 'rgba(176,178,232,0.12)' : 'transparent')};
	border: 1px solid ${({ isActive, theme }) => (isActive ? theme.primary : 'transparent')};
	color: ${({ isActive, theme }) => (isActive ? theme.primary : theme.txtColor)};
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
	padding: 8px;
	cursor: ${({ isActive }) => (isActive ? 'default' : 'pointer')};
	
	&:first-child {
		margin-right: 5px;
	}
	
`;

export const ViewMenuIcon = styled.span`
	&:before {
		font-size: 25px;
	}
`;
