import { Axios } from 'axios';
import { AppDispatch } from '@src/store';
import { Dispatch } from 'react';
import { neighborhoodsSlice } from '@src/store/neighborhoods/reducer';
import { getNotification } from '@src/notification/notifications';
import i18n from '@src/i18n';

export function userNeighborhoodsRequest(
	axiosPrivate: Axios, 
	controller: AbortController, 
	setLoading: (state: boolean) => void,
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		setLoading(true);
		try {
			const response = await axiosPrivate.get('neighborhood/user_neighborhoods', {
				signal: controller.signal,
			});
			dispatch(neighborhoodsSlice.actions.setNeighborhoods(response.data));
		} catch (e) {
			if (e.response?.data?.message !== 'NOT_AUTHORIZED') {
				getNotification(t('smtWntWrng'), 'error');
			}
		} finally {
			setLoading(false);
		}
	};
}

export function neighborhoodRequest(
	axiosPrivate: Axios,
	controller: AbortController,
	setLoading: (state: boolean) => void,
	id: string,
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		setLoading(true);
		try {
			const response = await axiosPrivate.get(`neighborhood/${id}`, {
				signal: controller.signal,
			});
			dispatch(neighborhoodsSlice.actions.setCurrentNeighborhood(response.data[0]));
		} catch (e) {
			if (e.response?.data?.message !== 'NOT_AUTHORIZED') {
				getNotification(t('smtWntWrng'), 'error');
			}
		} finally {
			setLoading(false);
		}
	};
}
