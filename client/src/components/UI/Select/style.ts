import styled from 'styled-components';

interface IDropdownStyle {
	disabled?: boolean,
	margin?: string,
}

export const DropdownWrapper = styled.div<IDropdownStyle>`
  width: 100%;
  font-size: 22px;
  position: relative;
	background-color: ${({ disabled }) => (disabled ? '#e0e0e0' : '#fff')};
	margin: ${({ margin }) => (margin || 0)};
	box-sizing: border-box;

  img {
    width: 16px;
    margin-right: 5px;
  }
`;

export const DropdownButton = styled.div`
  user-select: none;
	width: 100%;
	cursor: pointer;
  background-color: transparent;
  border: 1px solid rgba(23, 78, 130, 0.15);
  border-radius: 3px;
  text-overflow: ellipsis;
  display: flex;
	align-items: center;
  padding-left: 10px;
	overflow: hidden;
  white-space: nowrap;
	height: 30px;
  position: relative;
	font-size: 14px;
  text-transform: capitalize;
	
	i {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 10px;
		font-size: 25px;
	}
`;

export const DropdownLabel = styled.p`
  font-weight: 500;
  font-size: 13px;
	margin: 0 0 10px;
	user-select: none;
	cursor: default;
`;

export const DropdownContent = styled.div`
  position: absolute;
	top: 100%;
	width: 100%;
	z-index: 100;
  box-shadow: 0 0 10px rgba(132, 132, 132, 0.35);
`;

export const DropdownItem = styled.div`
  height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  padding: 5px 5px;
  white-space: nowrap;
  user-select: none;
  background-color: #fff;
  text-align: left;
  display: flex;
  align-items: center;
  text-transform: capitalize;

  &:hover {
    transition: all 0.1s;
    cursor: pointer;
    background-color: #e3e3e3;
  }
`;

export const DropdownPlaceholder = styled.span`
  color: #0D3C6D80;
  user-select: none;
`;
