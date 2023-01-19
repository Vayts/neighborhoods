import styled from 'styled-components';

export const CustomTooltipWrapper = styled.div`
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  border: none;
  outline: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.05);
`;

export const CustomTooltipTitle = styled.p`
  font-size: 18px;
	color: ${({ theme }) => theme.primary};
	margin: 0 0 10px;
`;

export const CustomTooltipText = styled.p`
  color: #000;
	margin: 0 0 10px;
`;
