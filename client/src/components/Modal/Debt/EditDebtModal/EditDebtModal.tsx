import React, { useState } from 'react';
import { IEditDebt, IEditDebtErrors, IEditDebtTouched } from '@src/components/Modal/Debt/EditDebtModal/types';
import { EditDebtWrapper } from '@src/components/Modal/Debt/EditDebtModal/style';
import { Input } from '@src/components/UI/Input/Input';
import { TextArea } from '@src/components/UI/TextArea/TextArea';
import { DatePicker } from '@src/components/UI/DatePicker/DatePicker';
import { useTranslation } from 'react-i18next';
import { Button } from '@src/components/UI/Button/Button';
import { Title } from '@src/components/Title/Title';
import { ErrorMsg } from '@src/components/UI/ErrorMsg/ErrorMsg';
import { IEditDebtState } from '@src/types/debt.types';
import { validateEditDebt } from '@helpers/debtValidation.helper';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { editDebtRequest } from '@src/store/debts/actions';
import { selectMinorDebtIsLoading } from '@src/store/debts/selectors';

export const EditDebtModal: React.FC<IEditDebt> = ({ debt }) => {
	const [editState, setEditState] = useState<IEditDebtState>({
		title: debt.title,
		description: debt.description,
		expDate: debt.expDate,
	});
	const [errors, setErrors] = useState<IEditDebtErrors>({});
	const [touched, setTouched] = useState<IEditDebtTouched>({});
	const isLoading = useAppSelector(selectMinorDebtIsLoading);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	
	const onChangeHandler = (e) => {
		const newState = {
			...editState, 
			[e.target.name]: e.target.value,
		};
		setEditState(newState);
		setTouched({ ...touched, [e.target.name]: true });
		setErrors(validateEditDebt({ ...newState }));
	};
	
	const onDateChangeHandler = (value) => {
		const newState = {
			...editState, 
			expDate: new Date(value).getTime(),
		};
		setEditState(newState);
		setErrors(validateEditDebt({ ...newState }));
		setTouched({ ...touched, expDate: true });
	};
	
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(editDebtRequest(debt._id, editState));
	};
	
	return (
		<EditDebtWrapper>
			<Title
				fz='19px'
				margin='0 0 10px'
			>
				{t('editing')}
			</Title>
			<form>
				<Input
					name='title'
					id='editTitle'
					onChange={onChangeHandler}
					height='30px'
					value={editState.title}
					width='100%'
					placeholder={t('title')}
					label={`${t('title')}`}
					margin='0 0 8px'
				/>
				<ErrorMsg show={!!errors.title && touched.title} msg={errors.title}/>
				<TextArea
					name='description'
					id='description'
					width='100%'
					onChange={onChangeHandler}
					value={editState.description}
					label={t('description')}
					placeholder={t('description')}
					margin='0 0 8px'
				/>
				<ErrorMsg show={!!errors.description && touched.description} msg={errors.description}/>
				<DatePicker
					value={editState.expDate ? new Date(editState.expDate) : null}
					id='createDebtExpDate'
					onChange={onDateChangeHandler}
					name='expDate'
					label={t('mustRepaid')}
					placeholder={t('mustRepaid')}
					margin='0 0 8px'
					height='30px'
					width='100%'
					initialValue={editState.expDate ? new Date(editState.expDate) : null}
				/>
				<ErrorMsg show={!!errors.expDate && touched.expDate} msg={errors.expDate}/>
				<Button
					margin='30px auto 0'
					width='40%'
					height='35px'
					onClick={submitHandler}
					title={t('save')}
					isLoading={isLoading}
					isDisabled={Object.keys(errors).length > 0 || Object.keys(touched).length === 0 || isLoading}
				/>
			</form>
		</EditDebtWrapper>
	);
};
