import { AppDispatch } from '@src/store';
import axios from '@src/api/axios';
import { authSlice } from '@src/store/auth/reducer';
import { IAuthState } from '@src/store/auth/types';
import { getNotification } from '@src/notification/notifications';
import { Dispatch } from 'react';
import i18n from '../../i18n';

export const refreshUser = (setLoading: (state: boolean) => void, controller: AbortController) => {
	return async (dispatch: AppDispatch) => {
		const t = i18n.t;
		
		try {
			const response = await axios.get('auth/refresh', {
				withCredentials: true,
				signal: controller.signal,
			});
			if (response.data) {
				dispatch(authSlice.actions.setAuth(response.data));
			}
			return response.data;
		} catch (e) {
			if (e.response.data.message === 'UNDEFINED_TOKEN') {
				getNotification(t('smtWntWrng'), 'error');
			}
		} finally {
			setLoading(false);
		}
	};
};

export const loginRequest = (values: IAuthState['loginIn'], setLoading: (state: boolean) => void): Dispatch<AppDispatch> => {
	return async (dispatch: AppDispatch) => {
		setLoading(true);
		const { password, login } = values;
		try {
			const response = await axios.post('/auth/login', { password, login }, {
				withCredentials: true,
			});
			dispatch(authSlice.actions.setAuth(response.data));
		} catch (e) {
			console.log(e);
			//TODO
			alert('ERROR');
		} finally {
			setLoading(false);
		}
	};
};

export const registerRequest = (values: IAuthState['register'], setLoading: (state: boolean) => void): Dispatch<AppDispatch> => {
	return async (dispatch: AppDispatch) => {
		setLoading(true);
		try {
			const { password, login, lastName, confirmPassword, firstName } = values;
			const response = await axios.post('/auth/register', { password, login, lastName, confirmPassword, firstName });
			dispatch(authSlice.actions.setAuth(response.data));
		} catch (e) {
			//TODO
			alert('ERROR');
		} finally {
			setLoading(false);
		}
	};
};

export const logoutRequest = (navigate: (str: string) => void): Dispatch<AppDispatch> => {
	return async (dispatch: AppDispatch) => {
		try {
			await axios.get('/auth/logout', {
				withCredentials: true,
			});
			dispatch(authSlice.actions.setAuth(null));
		} catch (e) {
			//TODO
			alert('ERROR');
		} finally {
			navigate('/login');
		}
	};
};
