import React, { useEffect } from 'react';
import {
	LoginContentHolder, LoginPageWrapper, LoginLogo,
	LoginLogoWrapper,
	LoginSubTitle,
	LoginTitle,
	LoginTitleWrapper, LoginForm, LoginFormLinkWrapper,
} from '@src/pages/LoginPage/style';
import { useTranslation } from 'react-i18next';
import { Input } from '@src/components/UI/Input/Input';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { Button } from '@src/components/UI/Button/Button';
import { RegisterFormLinkItem, RegisterFormLinkText } from '@src/pages/RegisterPage/style';
import { selectLoginData, selectLoginIsLoading } from '@src/store/auth/login/selectors';
import { loginRequest, resetLogin, setLogin } from '@src/store/auth/login/reducer';
import { ILoginState } from '@src/store/auth/login/types';
import { selectUser } from '@src/store/auth/user/selectors';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
	const values: ILoginState['data'] = useAppSelector(selectLoginData);
	const isLoading: boolean = useAppSelector(selectLoginIsLoading);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const user = useAppSelector(selectUser);
	// const user = useAppSelector(selectUser);
	const navigate = useNavigate();
	// const values = useAppSelector(selectLogin);
	
	useEffect(() => {
		if (user) {
			navigate('/');
		}

		return () => {
			dispatch(resetLogin);
		};
	}, [user]);
	
	const changeHandler = (e: React.ChangeEvent, name) => {
		const target = e.target as HTMLInputElement;
		dispatch(setLogin({ name, value: target.value }));
	};
	
	const submitHandler = (e: React.MouseEvent<Element, MouseEvent>) => {
		e.preventDefault();
		dispatch(loginRequest());
	};
	
	return (
		<LoginPageWrapper>
			<LoginContentHolder>
				<LoginLogoWrapper>
					<LoginLogo src='./assets/img/logoFull.svg' alt='logo'/>
				</LoginLogoWrapper>
				<LoginTitleWrapper>
					<LoginTitle>{t('signIn')}</LoginTitle>
					<LoginSubTitle>{t('signInTitle')}</LoginSubTitle>
				</LoginTitleWrapper>
				<LoginForm>
					<Input
						id='login'
						name='login'
						padding='8px 15px'
						margin='8px 0 20px'
						value={values.login}
						onChange={(e) => {
							changeHandler(e, 'login');
						}}
						width='425px'
						placeholder={t('login')}
						label={t('login')}
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
					<Button
						onClick={(e) => submitHandler(e)}
						type='submit'
						width='100%'
						title={t('signIn')}
						fz='18px'
						margin='30px 0 10px'
						padding='15px'
						height='50px'
						isDisabled={!values.login.length || !values.password.length}
						isLoading={isLoading}
					/>
				</LoginForm>
				<LoginFormLinkWrapper>
					<RegisterFormLinkText>{t('dontHaveAnAccount')}</RegisterFormLinkText>
					<RegisterFormLinkItem to='/register'>{t('signUp')}</RegisterFormLinkItem>
				</LoginFormLinkWrapper>
			</LoginContentHolder>
		</LoginPageWrapper>
	);
};
