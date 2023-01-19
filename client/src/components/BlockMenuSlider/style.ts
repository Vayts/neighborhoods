import styled from 'styled-components';

export const SliderMenuWrapper = styled.div`
  display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 15px;
	user-select: none;

  span {
    transform: rotate(-90deg);
		cursor: pointer;
		
		&:first-child {
      transform: rotate(90deg);
		}

    &:before {
      font-size: 30px;
    }
		
		&:hover {
			color: ${({ theme }) => theme.primary};
		}
  }
`;

export const SlideTitle = styled.h3`
	color: ${({ theme }) => theme.subTxtColor};
	font-weight: 300;
`;
