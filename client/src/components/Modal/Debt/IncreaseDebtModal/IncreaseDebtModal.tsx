import React, { useEffect, useRef, useState } from 'react';
import { Title } from '@src/components/Title/Title';
import { useTranslation } from 'react-i18next';
import { Input } from '@src/components/UI/Input/Input';
import { Description } from '@src/components/Description/Description';
import { Button } from '@src/components/UI/Button/Button';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { increaseDebtRequest } from '@src/store/debts/actions';
import { validateIncreaseDebt } from '@helpers/debtValidation.helper';
import { ErrorMsg } from '@src/components/UI/ErrorMsg/ErrorMsg';
import { IReduceDebt } from '@src/components/Modal/Debt/ReduceDebtModal/types';
import { IncreaseDebtWrapper } from '@src/components/Modal/Debt/IncreaseDebtModal/style';
import { selectMinorDebtIsLoading } from '@src/store/debts/selectors';

export const IncreaseDebtModal: React.FC<IReduceDebt> = ({ debt }) => {
	const [value, setValue] = useState('');
	const [errors, setErrors] = useState<Record<string, string>>({});
	const isLoading = useAppSelector(selectMinorDebtIsLoading);
	const paymentRef = useRef(null);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	
	useEffect(() => {
		if (paymentRef.current) {
			paymentRef.current.focus();
		}
	}, []);
	
	const onChangeHandler = (e) => {
		setErrors(validateIncreaseDebt(e.target.value));
		setValue(e.target.value);
	};
	
	const onSubmit = (e) => {
		e.preventDefault();
		dispatch(increaseDebtRequest(debt._id, Number(value)));
	};
	
	return (
		<IncreaseDebtWrapper>
			<Title margin='0 auto'>{t('increaseDebtTitle')}</Title>
			<Description
				margin='5px 0 15px'
			>
				{t('increaseDebtText')}
			</Description>
			<form>
				<Input
					refValue={paymentRef}
					name='increaseDebt'
					id='increaseDebt'
					onChange={onChangeHandler}
					value={value}
					type='number'
					placeholder={t('amountOfMoney')}
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
		</IncreaseDebtWrapper>
	);
};
