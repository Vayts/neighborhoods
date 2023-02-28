import { axiosPrivate } from '@src/api/axios';
import { AxiosInstance } from 'axios';
import { IUserState } from '@src/store/auth/user/types';

export function generateAxiosPrivate(user: IUserState['data']): AxiosInstance {
	const axios = axiosPrivate;
	axiosPrivate.interceptors.request.use(
		(config) => {
			if (!config.headers.Authorization) {
				config.headers.Authorization = `Bearer ${user?.token}`;
			}
			return config;
		}, (error) => Promise.reject(error),
	);
	return axios;
}
