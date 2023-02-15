import React, { useState } from 'react';
import { PartialPaymentWrapper } from '@src/components/Modal/PartialPaymentModal/style';
import { IPartialPayment } from '@src/components/Modal/PartialPaymentModal/types';
import { Title } from '@src/components/Title/Title';
import { useTranslation } from 'react-i18next';
import { Input } from '@src/components/UI/Input/Input';

export const PartialPaymentModal: React.FC<IPartialPayment> = ({ debt, neighborhood }) => {
	const [value, setValue] = useState('');
	const { t } = useTranslation();
	
	const onChangeHandler = (e) => {
		setValue(e.target.value);
	};
	
	return (
		<PartialPaymentWrapper>
			<Title>{t('partialPaymentMenu')}</Title>
			<Input name='partialPayment' id='partialPaymentNumber' onChange={onChangeHandler} value={value} type='number'/>
		</PartialPaymentWrapper>
	);
};
