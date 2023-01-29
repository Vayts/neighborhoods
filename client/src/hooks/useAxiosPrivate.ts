import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectUser } from '@src/store/auth/selectors';
import { useEffect } from 'react';
import { axiosPrivate } from '@src/api/axios';
import { refreshUser } from '@src/store/auth/actions';
import { Axios } from 'axios';

export const useAxiosPrivate = (): Axios => {
	const dispatch = useAppDispatch();
	const user = useAppSelector(selectUser);
	
	useEffect(() => {
		const controller = new AbortController();
		
		const requestIntercept = axiosPrivate.interceptors.request.use(
			(config) => {
				if (!config.headers.Authorization) {
					config.headers.Authorization = `Bearer ${user?.token}`;
				}
				return config;
			}, (error) => Promise.reject(error),
		);
		
		const responseIntercept = axiosPrivate.interceptors.response.use(
			(response) => response,
			async (error) => {
				const prevRequest = error?.config;
				if (error?.response?.status === 401 && !prevRequest?.sent) {
					prevRequest.sent = true;
					const value = await dispatch(refreshUser(() => null, controller));
					if (value) {
						prevRequest.headers.Authorization = `Bearer ${value?.token}`;
					}
					return axiosPrivate(prevRequest);
				}
				return Promise.reject(error);
			},
		);
		
		return () => {
			axiosPrivate.interceptors.request.eject(requestIntercept);
			axiosPrivate.interceptors.response.eject(responseIntercept);
		};
	}, [user]);
	
	return axiosPrivate;
};
