import React, { useEffect, useState } from 'react';
import {
	RegisterContentHolder, RegisterForm,
	RegisterFormDivider, RegisterFormLinkItem, RegisterFormLinkText, RegisterFormLinkWrapper,
	RegisterLogo, RegisterLogoWrapper,
	RegisterPageWrapper, RegisterSubDivider, RegisterSubTitle, RegisterTitle, RegisterTitleWrapper,
} from '@src/pages/RegisterPage/style';
import { Input } from '@src/components/UI/Input/Input';
import { Button } from '@src/components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectRegister, selectUser } from '@src/store/auth/selectors';
import { authSlice } from '@src/store/auth/reducer';
import { ErrorMsg } from '@src/components/UI/ErrorMsg/ErrorMsg';
import { totalRegisterValidate } from '@helpers/validation';
import { registerRequest } from '@src/store/auth/actions';
import { useNavigate } from 'react-router-dom';

export const RegisterPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { setRegister } = authSlice.actions;
	const values = useAppSelector(selectRegister);
	const user = useAppSelector(selectUser);
	const [isLoading, setLoading] = useState(false);
	const navigate = useNavigate();
	const { t } = useTranslation();
	
	useEffect(() => {
		if (user) {
			navigate('/');
		}
		
		return () => {
			dispatch(authSlice.actions.resetRegister());
		};
	}, [user]);
	
	const changeHandler = (e: React.ChangeEvent, name) => {
		const target = e.target as HTMLInputElement;
		dispatch(setRegister({ name, value: target.value }));
	};
	
	const submitHandler = (e:React.MouseEvent<Element, MouseEvent>) => {
		e.preventDefault();
		if (!Object.keys(totalRegisterValidate(values)).length) {
			dispatch(registerRequest(values, setLoading));
		}
	};
	
	return (
		<RegisterPageWrapper>
			<RegisterContentHolder>
				<RegisterLogoWrapper>
					<RegisterLogo src='./assets/img/logoFull.svg' alt='logo'/>
				</RegisterLogoWrapper>
				<RegisterTitleWrapper>
					<RegisterTitle>{t('signUp')}</RegisterTitle>
					<RegisterSubTitle>{t('signUpTitle')}</RegisterSubTitle>
				</RegisterTitleWrapper>
				<RegisterForm>
					<RegisterFormDivider>
						<RegisterSubDivider>
							<Input
								id='firstName'
								name='firstName'
								padding='8px 15px'
								margin='8px 0'
								value={values.firstName}
								onChange={(e) => {
									changeHandler(e, 'firstName');
								}}
								width='200px'
								placeholder={t('firstName')}
								label={t('firstName')}
							/>
							<ErrorMsg
								show={values.errors.firstName && values.touched.firstName}
								msg={values.errors.firstName}
							/>
						</RegisterSubDivider>
						<RegisterSubDivider>
							<Input
								id='lastName'
								name='lastName'
								padding='8px 15px'
								margin='8px 0'
								value={values.lastName}
								onChange={(e) => {
									changeHandler(e, 'lastName');
								}}
								width='200px'
								placeholder={t('lastName')}
								label={t('lastName')}
							/>
							<ErrorMsg
								show={values.errors.lastName && values.touched.lastName}
								msg={values.errors.lastName}
							/>
						</RegisterSubDivider>
					</RegisterFormDivider>
					<Input
						id='login'
						name='login'
						padding='8px 15px'
						margin='8px 0'
						value={values.login}
						onChange={(e) => {
							changeHandler(e, 'login');
						}}
						width='100%'
						placeholder={t('login')}
						label={t('login')}
					/>
					<ErrorMsg
						show={values.errors.login && values.touched.login}
						msg={values.errors.login}
					/>
					<Input
						id='password'
						name='password'
						padding='8px 15px'
						margin='8px 0'
						value={values.password}
						onChange={(e) => {
							changeHandler(e, 'password');
						}}
						width='100%'
						placeholder={t('password')}
						label={t('password')}
						type='password'
						secure
					/>
					<ErrorMsg
						show={values.errors.password && values.touched.password}
						msg={values.errors.password}
					/>
					<Input
						id='confirmPassword'
						name='confirmPassword'
						padding='8px 15px'
						margin='8px 0'
						value={values.confirmPassword}
						onChange={(e) => {
							changeHandler(e, 'confirmPassword');
						}}
						width='100%'
						placeholder={t('confirmPassword')}
						label={t('confirmPassword')}
						type='password'
						secure
					/>
					<ErrorMsg
						show={values.errors.confirmPassword && values.touched.confirmPassword}
						msg={values.errors.confirmPassword}
					/>
					<Button
						onClick={(e) => submitHandler(e)}
						type='submit'
						width='100%'
						title={t('signUp')}
						fz='18px'
						height='50px'
						margin='30px 0 10px'
						padding='15px'
						isDisabled={!Object.keys(values.touched).length || !!Object.keys(values.errors).length}
						isLoading={isLoading}
					/>
				</RegisterForm>
				<RegisterFormLinkWrapper>
					<RegisterFormLinkText>{t('alreadyHaveAnAccount')}</RegisterFormLinkText>
					<RegisterFormLinkItem to='/login'>{t('loginNow')}</RegisterFormLinkItem>
				</RegisterFormLinkWrapper>
			</RegisterContentHolder>
		</RegisterPageWrapper>
	);
};
