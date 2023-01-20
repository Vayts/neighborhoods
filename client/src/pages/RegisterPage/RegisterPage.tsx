import React from 'react';
import {
	RegisterContentHolder,
	RegisterFormDivider, RegisterFormLinkItem, RegisterFormLinkText, RegisterFormLinkWrapper,
	RegisterLogo, RegisterLogoWrapper,
	RegisterPageWrapper, RegisterSubTitle, RegisterTitle, RegisterTitleWrapper,
} from '@src/pages/RegisterPage/style';
import { Input } from '@src/components/UI/Input/Input';
import { Button } from '@src/components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectRegister } from '@src/store/auth/selectors';
import { authSlice } from '@src/store/auth/reducer';

export const RegisterPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const { setRegister } = authSlice.actions;
	const values = useAppSelector(selectRegister);
	const { t } = useTranslation();
	
	const changeHandler = (e: React.ChangeEvent, name) => {
		const target = e.target as HTMLInputElement;
		dispatch(setRegister({ name, value: target.value }));
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
				<RegisterFormDivider>
					<Input
						id='firstName'
						name='firstName'
						value={values.firstName}
						onChange={(e) => {
							changeHandler(e, 'firstName');
						}}
						width='200px'
						placeholder={t('firstName')}
						label={t('firstName')}
					/>
					<Input
						id='lastName'
						name='lastName'
						value={values.lastName}
						onChange={(e) => {
							changeHandler(e, 'lastName');
						}}
						width='200px'
						placeholder={t('lastName')}
						label={t('lastName')}
					/>
				</RegisterFormDivider>
				<Input
					id='login'
					name='login'
					value={values.login}
					onChange={(e) => {
						changeHandler(e, 'login');
					}}
					width='100%'
					placeholder={t('login')}
					label={t('login')}
				/>
				<Input
					id='password'
					name='password'
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
				<Input
					id='confirmPassword'
					name='confirmPassword'
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
				<Button
					onClick={() => {
						return 'set';
					}}
					type='submit'
					width='100%'
					title={t('signUp')}
					fz='18px'
					margin='50px 0 10px'
					padding='15px'
					isDisabled={!Object.keys(values.touched).length || !!Object.keys(values.errors).length}
				/>
				<RegisterFormLinkWrapper>
					<RegisterFormLinkText>{t('alreadyHaveAnAccount')}</RegisterFormLinkText>
					<RegisterFormLinkItem to='/login'>{t('loginNow')}</RegisterFormLinkItem>
				</RegisterFormLinkWrapper>
			</RegisterContentHolder>
		</RegisterPageWrapper>
	);
};
