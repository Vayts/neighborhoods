import styled from 'styled-components';
import { IUserItemStyle, IUserMenuStyle } from '@src/components/Header/UserMenu/types';

export const UserMenuWrapper = styled.div<IUserMenuStyle>`
  min-width: 220px;
  height: 100%;
  position: relative;
  padding: 12px 10px;
	box-shadow: ${({ isOpen }) => (isOpen ? '0 10px 10px rgba(0, 0, 0, 0.1)' : 'none')};

  span {
    align-self: center;
    justify-self: flex-end;
    cursor: pointer;

    &:before {
      font-size: 30px;
      color: #B6B6B6;
    }

    &:hover {
      transition: all 0.2s;

      &:before {
        color: ${({ theme }) => theme.txtColor};
      }
    }
  }
`;

export const UserMenuButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const UserMenuInfo = styled.div`
	margin-left: 10px;
	margin-right: 10px;
	flex-grow: 1;
`;

export const UserMenuName = styled.h4`
	margin: 0;
  font-weight: 500;
  font-size: 16px;
`;

export const UserMenuLogin = styled.p`
  margin: 0;
  color: #B6B6B6;
	font-size: 14px;
`;

export const UserMenuDropdown = styled.ul`
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;
  right: 0;
  top: calc(100%);
  background-color: #fff;
  border-top: 1px solid #f6f6f6;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  list-style: none;
  user-select: none;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

export const UserMenuItem = styled.li<IUserItemStyle>`
	font-size: 16px;
	padding: 15px 0 15px 10px;
	user-select: none;
	color: ${({ color, theme }) => color || theme.txtColor};
  display: flex;
	align-items: center;
	line-height: 1;
	font-family: Roboto, 'sans-serif';
	
	&:last-child {
		font-weight: 500;
		color: ${({ theme }) => `${theme.errorColor}`};
	}
	
	span {
    &:before {
      color: ${({ color, theme }) => (color ? theme.errorColor : theme.txtColor)};
	    font-size: 20px;
      margin-right: 5px;
    }
	}
	
	&:hover {
		background-color: #F9F8F8;
		cursor: pointer;
	}
`;
