import { Axios } from 'axios';
import { AppDispatch } from '@src/store';
import { Dispatch } from 'react';
import { neighborhoodsSlice } from '@src/store/neighborhoods/reducer';
import { getNotification } from '@src/notification/notifications';
import i18n from '@src/i18n';
import { INeighborhoodsState } from '@src/store/neighborhoods/types';

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

export function userDebtsRequest(
	axiosPrivate: Axios,
	controller: AbortController,
	setLoading: (state: boolean) => void,
	id: string,
	filters: INeighborhoodsState['currentDebts']['filters'],
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		setLoading(true);
		try {
			const response = await axiosPrivate.get(`neighborhood/debts/${id}?authors=${filters.authors.length ? filters.authors.concat('') : ''}&status=${filters.status.length ? filters.status.concat('') : ''}&min=${filters.minValue}&max=${filters.maxValue}`, {
				signal: controller.signal,
			});
			dispatch(neighborhoodsSlice.actions.setCurrentDebts(response.data));
		} catch (e) {
			if (e.response?.data?.message !== 'NOT_AUTHORIZED' && e.response.code !== 'ERR_CANCELED') {
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

export function addAuthorToDebtFilter(filters: INeighborhoodsState['currentDebts']['filters'], value: string): Dispatch<AppDispatch> {
	return (dispatch) => {
		const isInAuthors = filters.authors.includes(value);
		let newState;
		if (!isInAuthors) {
			newState = [...filters.authors, value];
		}
		if (isInAuthors) {
			newState = filters.authors.filter((item) => item !== value);
		}
		dispatch(neighborhoodsSlice.actions.setDebtAuthorFilters(newState));
	};
}

export function addStatusToDebtFilter(filters: INeighborhoodsState['currentDebts']['filters'], value: string): Dispatch<AppDispatch> {
	return (dispatch) => {
		const isInStatus = filters.status.includes(value);
		let newState;
		if (!isInStatus) {
			newState = [...filters.status, value];
		}
		if (isInStatus) {
			newState = filters.status.filter((item) => item !== value);
		}
		dispatch(neighborhoodsSlice.actions.setDebtStatusFilters(newState));
	};
}

export function addValueToDebtFilter(filters: INeighborhoodsState['currentDebts']['filters'], key: string, value: string): Dispatch<AppDispatch> {
	return (dispatch) => {
		dispatch(neighborhoodsSlice.actions.setDebtValueFilters({ value, key }));
	};
}
