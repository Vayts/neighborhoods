import styled from 'styled-components';
import { IAddButtonStyle } from '@src/components/UI/AddButton/types';

export const AddButtonWrapper = styled.div<IAddButtonStyle>`
	width: ${({ size = '45px' }) => size};
  height: ${({ size = '45px' }) => size};
	border: 1px solid #fff;
  display: flex;
  justify-content: center;
	align-items: center;
	border-radius: 10px;
	transition: all 0.2s;
	background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.05);
	
	&:hover {
		cursor: pointer;
		background-color: ${({ theme }) => `${theme.primary}10`};
		border-color: ${({ theme }) => theme.primary};
		span {
      color: ${({ theme }) => theme.primary};
		}
	}

  &:active {
    background-color: ${({ theme }) => `${theme.primary}95`};
    span {
      color: #fff;
    }
  }

`;

export const AddButtonIcon = styled.span<IAddButtonStyle>`
	font-size: ${({ fz = '20px' }) => fz};
`;
