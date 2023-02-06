import styled, { keyframes } from 'styled-components';
import { IMenuStyle } from '@src/components/UI/Menu/types';

const appear = keyframes`
  0% {
    opacity: 0;
	  transform: scale(0.95);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

export const MenuWrapper = styled.div`
	display: inline-block;
  position: relative;
`;

export const MenuIcon = styled.span`
  font-size: 25px;
  color: ${({ theme }) => theme.subTxtColor};

  &:hover {
    cursor: pointer;
    transition: all 0.2s;
    color: ${({ theme }) => theme.primary};
  }
`;

export const MenuContent = styled.div<IMenuStyle>`
  background-color: #ffffff;
  position: absolute;
  right: 0;
  top: 0;
  width: 200px;
  max-width: 200px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
  border-radius: 5px;
  border: 1px solid #efefef;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  animation: ${appear} 0.1s linear;
`;
