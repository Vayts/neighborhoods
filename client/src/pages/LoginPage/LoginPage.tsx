import React from 'react';
import {
	LoginContentHolder, LoginPageWrapper, LoginLogo,
	LoginLogoWrapper,
	LoginSubTitle,
	LoginTitle,
	LoginTitleWrapper, LoginForm, LoginFormLinkWrapper,
} from '@src/pages/LoginPage/style';
import { useTranslation } from 'react-i18next';
import { Input } from '@src/components/UI/Input/Input';
import { authSlice } from '@src/store/auth/reducer';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectLogin } from '@src/store/auth/selectors';
import { Button } from '@src/components/UI/Button/Button';
import { RegisterFormLinkItem, RegisterFormLinkText } from '@src/pages/RegisterPage/style';

export const LoginPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { setLogin } = authSlice.actions;
	const values = useAppSelector(selectLogin);
	
	const changeHandler = (e: React.ChangeEvent, name) => {
		const target = e.target as HTMLInputElement;
		dispatch(setLogin({ name, value: target.value }));
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
						onClick={() => {
							console.log('test');
						}}
						type='submit'
						width='100%'
						title={t('signIn')}
						fz='18px'
						margin='30px 0 10px'
						padding='15px'
						isDisabled={!values.login.length || !values.password.length}
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
