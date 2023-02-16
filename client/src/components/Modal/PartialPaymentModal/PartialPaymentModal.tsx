import React, { useEffect, useRef, useState } from 'react';
import { PartialPaymentWrapper } from '@src/components/Modal/PartialPaymentModal/style';
import { IPartialPayment } from '@src/components/Modal/PartialPaymentModal/types';
import { Title } from '@src/components/Title/Title';
import { useTranslation } from 'react-i18next';
import { Input } from '@src/components/UI/Input/Input';
import { Description } from '@src/components/Description/Description';
import { Button } from '@src/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { partialPaymentRequest } from '@src/store/debtors/actions';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';
import { selectCurrentDebtors } from '@src/store/debtors/selectors';
import { validatePartialPayment } from '@helpers/debtValidation.helper';
import { ErrorMsg } from '@src/components/UI/ErrorMsg/ErrorMsg';

export const PartialPaymentModal: React.FC<IPartialPayment> = ({ debt }) => {
	const [value, setValue] = useState('');
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [isLoading, setLoading] = useState<boolean>(false);
	const axiosPrivate = useAxiosPrivate();
	const debtors = useAppSelector(selectCurrentDebtors);
	const paymentRef = useRef(null);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	
	useEffect(() => {
		if (paymentRef.current) {
			paymentRef.current.focus();
		}
	}, []);
	
	const onChangeHandler = (e) => {
		setErrors(validatePartialPayment(e.target.value, debt.value));
		setValue(e.target.value);
	};
	
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(partialPaymentRequest(axiosPrivate, setLoading, debt.neighborhood, debt._id, debtors, Number(value)));
	};
	
	const generatePlaceholder = () => {
		if (debt.value - 1 < 0.1) {
			return `${t('amountOfMoney')}`;
		}
		return `${t('amountOfMoney')}: 0.1 ₴ \u2013 ${Number((debt.value - 1).toFixed(2))} ₴`;
	};
	
	return (
		<PartialPaymentWrapper>
			<Title margin='0 auto'>{t('partialPaymentMenu')}</Title>
			<Description
				margin='5px 0 15px'
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
					placeholder={generatePlaceholder()}
					width='100%'
					label={t('amountOfMoney')}
					min={1}
					max={debt.value - 1}
				/>
				<ErrorMsg show={Object.keys(errors).length > 0} msg={errors?.value}/>
				<Button
					onClick={onSubmit}
					title={t('submit')}
					margin='20px auto 0'
					height='40px'
					isLoading={isLoading}
					width='50%'
					isDisabled={Object.keys(errors).length > 0 || !value || isLoading}
				/>
			</form>
		</PartialPaymentWrapper>
	);
};
