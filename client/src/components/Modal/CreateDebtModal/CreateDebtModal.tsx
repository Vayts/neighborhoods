import React, { createRef, useEffect, useState } from 'react';
import {
	CreateDebtForm, CreateDebtIcon,
	CreateDebtSubTitleWrapper,
	CreateDebtWrapper,
} from '@src/components/Modal/CreateDebtModal/style';
import { Input } from '@src/components/UI/Input/Input';
import { useTranslation } from 'react-i18next';
import { Title } from '@src/components/Title/Title';
import { ICreateDebtModal } from '@src/components/Modal/CreateDebtModal/types';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectDebtForm, selectDebtFormErrors, selectDebtFormTouched } from '@src/store/createDebt/selectors';
import { createDebtSlice } from '@src/store/createDebt/reducer';
import { TextArea } from '@src/components/UI/TextArea/TextArea';
import { Button } from '@src/components/UI/Button/Button';
import { ErrorMsg } from '@src/components/UI/ErrorMsg/ErrorMsg';
import { DatePicker } from '@src/components/UI/DatePicker/DatePicker';
import { Select } from '@src/components/UI/Select/Select';
import { generateUserSelectList } from '@helpers/user.helper';
import { selectUser } from '@src/store/auth/selectors';
import { createDebtRequest } from '@src/store/createDebt/action';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';

export const CreateDebtModal: React.FC<ICreateDebtModal> = ({ neighborhood }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const values = useAppSelector(selectDebtForm);
	const errors = useAppSelector(selectDebtFormErrors);
	const touched = useAppSelector(selectDebtFormTouched);
	const user = useAppSelector(selectUser);
	const inputRef = createRef<HTMLInputElement>();
	const axiosPrivate = useAxiosPrivate();
	const [isLoading, setLoading] = useState<boolean>(false);
	
	useEffect(() => {
		if (inputRef) {
			inputRef.current.focus();
		}
		
		return () => {
			dispatch(createDebtSlice.actions.resetCreateDebt());
		};
	}, []);
	
	const changeHandler = (e) => {
		dispatch(createDebtSlice.actions.setValueToCreateForm({ name: e.target.name, value: e.target.value }));
	};
	const changeDateHandler = (value) => {
		dispatch(createDebtSlice.actions.setValueToCreateForm({ name: 'expDate', value: new Date(value).getTime() }));
	};
	
	const changeAuthorHandler = (value) => {
		dispatch(createDebtSlice.actions.setValueToCreateForm({ name: 'debtor', value }));
	};
	
	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(createDebtRequest(axiosPrivate, setLoading, values, neighborhood._id));
	};
	
	return (
		<CreateDebtWrapper>
			<Title fz='22px' margin='5px 0 10px'>{t('createDebt')}</Title>
			<CreateDebtSubTitleWrapper>
				<CreateDebtIcon className='icon-home'/>
				<Title fz='14px' margin='0'>{neighborhood.title}</Title>
			</CreateDebtSubTitleWrapper>
			
			<CreateDebtForm>
				<Input
					refValue={inputRef}
					name='title'
					id='createDebtTitle'
					onChange={changeHandler}
					value={values.title}
					width='100%'
					height='30px'
					margin='0 0 8px'
					placeholder={t('title')}
					label={`* ${t('title')}`}
				/>
				<ErrorMsg show={!!errors.title && touched.title} msg={errors.title}/>
				<Input
					name='value'
					id='createDebtValue'
					onChange={changeHandler}
					value={values.value}
					width='100%'
					height='30px'
					type='number'
					min={1}
					max={50000}
					margin='0 0 8px'
					placeholder={t('amountOfDebt')}
					label={`* ${t('amountOfDebt')}`}
				/>
				<ErrorMsg show={!!errors.value && touched.value} msg={errors.value}/>
				<Select
					label={`* ${t('debtor')}`}
					arr={generateUserSelectList(neighborhood.users, user._id)}
					onChange={changeAuthorHandler}
					value={values.debtor}
					placeholder={t('debtor')}
					margin='3px 0 8px'
				/>
				<ErrorMsg show={!!errors.debtor && touched.debtor} msg={errors.debtor}/>
				<DatePicker
					value={values.expDate}
					id='createDebtExpDate'
					onChange={changeDateHandler}
					name='expDate'
					label={t('mustRepaid')}
					placeholder={t('mustRepaid')}
					margin='0 0 8px'
					height='30px'
					width='100%'
				/>
				<ErrorMsg show={!!errors.expDate && touched.expDate} msg={errors.expDate}/>
				<TextArea
					name='description'
					id='createDebtDescription'
					onChange={changeHandler}
					value={values.description}
					width='100%'
					height='30px'
					margin='0 0 8px'
					label={t('description')}
					placeholder={t('description')}
				/>
				<ErrorMsg show={!!errors.description && touched.value} msg=''/>
				<Button
					onClick={submitHandler}
					title={t('create')}
					width='50%'
					height='35px'
					margin='20px auto 10px'
					isDisabled={Object.keys(errors).length > 0 || Object.keys(touched).length === 0 || isLoading}
				/>
			</CreateDebtForm>
		</CreateDebtWrapper>
	);
};
