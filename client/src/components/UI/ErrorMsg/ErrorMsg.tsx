import React from 'react';
import { IErrorMsg } from '@src/components/UI/ErrorMsg/types';
import { ErrorMsgText, ErrorMsgWrapper } from '@src/components/UI/ErrorMsg/style';

export const ErrorMsg: React.FC<IErrorMsg> = ({ msg, show, margin }: IErrorMsg) => {
	return (
		<ErrorMsgWrapper margin={margin}>
			<ErrorMsgText>{show ? msg : ''}</ErrorMsgText>
		</ErrorMsgWrapper>
	);
};
