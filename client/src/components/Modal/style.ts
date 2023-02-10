import styled, { keyframes } from 'styled-components';
import { IModalOpen } from '@src/components/Modal/types';

const appear = keyframes`
  from {
   	transform: scale(0.99);
  }
  to {
    transform: scale(1);
  }
`;

const background = keyframes`
  from {
   	opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const ModalBackground = styled.div<IModalOpen>`
  height: 100vh;
  transition: ${({ open }) => (open ? 'opacity 0.4s' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  bottom: 0;
  display: flex;
	justify-content: center;
	align-items: center;
  background-color: rgba(0, 0, 0, 0.45);
  overflow: hidden;
  animation: ${background} 0.1s linear;
`;

export const ModalWindow = styled.div`
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  z-index: 100;
	padding-top: 35px;
  animation: ${appear} 0.1s linear;
	margin: 10px;
	min-width: 300px;
`;

export const ModalClose = styled.span`
  position: absolute;
	top: 10px;
	right: 10px;
	
	&:hover {
		cursor: pointer;
		transition: all 0.2s;
		&:before {
			color: ${({ theme }) => theme.primary};
		}
	}
	&:before {
		font-size: 25px;
		color: ${({ theme }) => theme.subTxtColor};
	}
`;
