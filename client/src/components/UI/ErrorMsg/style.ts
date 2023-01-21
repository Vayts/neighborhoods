import styled from 'styled-components';
import { IErrorWrapperStyle } from '@src/components/UI/ErrorMsg/types';

export const ErrorMsgWrapper = styled.div<IErrorWrapperStyle>`
	height: 10px;
	margin: ${({ margin = '0' }) => margin};
`;

export const ErrorMsgText = styled.p`
	margin: 0;
	font-size: 12px;
	color: ${({ theme }) => theme.errorColor};
	text-align: center;
`;
