import styled from 'styled-components';

interface IInputWrapper {
	margin?: string,
}
interface IInputItem {
	width?: string,
	height?: string,
	fz?: string,
	padding?: string,
}

export const InputWrapper = styled.div<IInputWrapper>`
	margin: ${({ margin = '10px 0' }) => margin};
	display: flex;
	flex-direction: column;
`;

export const InputContent = styled.div`
  width: 100%;
  position: relative;

  span {
    right: 10px;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
    color: #989898;
		cursor: pointer;
		
		&:active {
			color: #1d1d1d;
		}
  }
`;

export const InputItem = styled.input<IInputItem>`
  border: 1px solid rgba(23, 78, 130, 0.15);
  border-radius: 3px;
  padding: ${({ padding = '10px 15px' }) => padding};
  width: ${({ width = 'auto' }) => width};
  font-size: ${({ fz = '15px' }) => fz};

  &:focus {
    outline: 1px solid rgba(29, 29, 29, 0.39);
  }

  &::placeholder {
    color: #0D3C6D80;
		user-select: none;
  }
`;

export const InputLabel = styled.label`
  font-weight: 500;
  font-size: 13px;
	margin-bottom: 10px;
`;
