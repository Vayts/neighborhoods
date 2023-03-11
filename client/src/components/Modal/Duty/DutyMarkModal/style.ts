// DutyMarkMenu, DutyMarkMenuItem, DutyMarkModalWrapper, DutyMarkTopContent

import styled from 'styled-components';

export const DutyMarkModalWrapper = styled.div`
	max-width: 420px;
	min-width: 420px;
`;

export const DutyMarkMenu = styled.ul`
	margin: 15px 0 0;
	padding: 0;
	list-style: none;
`;

interface IDutyMarkMenu {
	disabled?: boolean;
}

export const DutyMarkMenuItem = styled.li<IDutyMarkMenu>`
	text-align: center;
	border-bottom: 1px solid ${({ theme }) => `${theme.subTxtColor}20`};
	padding: 10px 0;
	cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
	pointer-events: ${({ disabled }) => (disabled ? 'none' : 'default')};
	font-size: 14px;
	color: ${({ disabled, theme }) => (disabled ? `${theme.subTxtColor}95` : 'inherit')};
	background-color: ${({ disabled, theme }) => (disabled ? `${theme.subTxtColor}15` : 'transparent')};;
	
	&:hover {
		transition: all 0.2s;
		background-color: ${({ theme, disabled }) => (disabled ? `${theme.subTxtColor}15` : '#F9F8F8')};
	}
	
	&:last-child {
		color: ${({ theme }) => theme.errorColor};
	}
`;

export const DutyMarkTopContent = styled.div`
	padding: 0 20px;
`;
