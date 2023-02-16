import React, { useEffect, useRef, useState } from 'react';
import { PartialPaymentWrapper } from '@src/components/Modal/PartialPaymentModal/style';
import { IPartialPayment } from '@src/components/Modal/PartialPaymentModal/types';
import { Title } from '@src/components/Title/Title';
import { useTranslation } from 'react-i18next';
import { Input } from '@src/components/UI/Input/Input';
import { Description } from '@src/components/Description/Description';
import { Button } from '@src/components/UI/Button/Button';

export const PartialPaymentModal: React.FC<IPartialPayment> = ({ debt }) => {
	const [value, setValue] = useState('');
	const paymentRef = useRef(null);
	const { t } = useTranslation();
	
	useEffect(() => {
		if (paymentRef.current) {
			paymentRef.current.focus();
		}
	}, []);
	
	const onChangeHandler = (e) => {
		setValue(e.target.value);
	};
	
	const onSubmit = () => {
	
	};
	
	return (
		<PartialPaymentWrapper>
			<Title margin='0 auto'>{t('partialPaymentMenu')}</Title>
			<Description
				margin='5px 0 20px'
			>
				{t('specifyAmountOfMoney')}
			</Description>
			<form>
				<Input
					refValue={paymentRef}
					name='partialPayment'
					id='partialPaymentNumber'
					onChange={onChangeHandler}
					value={value}
					type='number'
					placeholder={`${t('amountOfMoney')}: 1 ₴ \u2013 ${debt.value - 1} ₴`}
					width='100%'
					label={t('amountOfMoney')}
					min={1}
					max={debt.value - 1}
				/>
				<Button
					onClick={onSubmit}
					title={t('submit')}
					margin='30px auto 0'
					height='30px'
				/>
			</form>
		</PartialPaymentWrapper>
	);
};
