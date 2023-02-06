import styled from 'styled-components';
import { IUserCounter, IUserListItem } from '@src/components/UserList/types';

export const UserListWrapper = styled.div``;

export const UserListContent = styled.ul`
  display: flex;
`;

export const UserListItem = styled.li<IUserListItem>`
	margin: 0 0 0 -10px;
	border-radius: 50%;
	border: 2px solid #fff;
	padding: 0;
  position: relative;
	z-index: ${({ index }) => index};
	list-style: none;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
`;

export const UserListCounter = styled.li<IUserCounter>`
  height: ${({ size = 30 }) => `${size}px`};
	width: ${({ size = 30 }) => `${size}px`};
  border: 2px solid #fff;
	font-size: 14px;
	color: #fff;
  display: flex;
  justify-content: center;
	align-items: center;
	background-color: ${({ theme }) => theme.secondColor};
	border-radius: 50%;
  padding: 0;
  margin: 0 0 0 -10px;
  position: relative;
	box-sizing: content-box;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	user-select: none;
	cursor: pointer;
`;
