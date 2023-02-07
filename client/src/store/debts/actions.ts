import { Dispatch } from 'react';
import { AppDispatch } from '@src/store';
import { Axios } from 'axios';
import i18n from '@src/i18n';
import { getNotification } from '@src/notification/notifications';
import { debtsSlice } from '@src/store/debts/reducer';
import { IDebtsState } from '@src/store/debts/types';

export function userDebtsRequest(
	axiosPrivate: Axios,
	controller: AbortController,
	setLoading: (state: boolean) => void,
	id: string,
	filters: IDebtsState['filters'],
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		setLoading(true);
		try {
			const response = await axiosPrivate.get(`neighborhood/debts/${id}?authors=${filters.authors.length ? filters.authors.concat('') : ''}&status=${filters.status.length ? filters.status.concat('') : ''}&min=${filters.minValue}&max=${filters.maxValue}`, {
				signal: controller.signal,
			});
			dispatch(debtsSlice.actions.setCurrentDebts(response.data));
		} catch (e) {
			if (e.response?.data?.message !== 'NOT_AUTHORIZED' && e.response.code !== 'ERR_CANCELED') {
				getNotification(t('smtWntWrng'), 'error');
			}
		} finally {
			setLoading(false);
		}
	};
}

export function addAuthorToDebtFilter(filters: IDebtsState['filters'], value: string): Dispatch<AppDispatch> {
	return (dispatch) => {
		const isInAuthors = filters.authors.includes(value);
		let newState;
		if (!isInAuthors) {
			newState = [...filters.authors, value];
		}
		if (isInAuthors) {
			newState = filters.authors.filter((item) => item !== value);
		}
		dispatch(debtsSlice.actions.setDebtAuthorFilters(newState));
	};
}

export function addStatusToDebtFilter(filters: IDebtsState['filters'], value: string): Dispatch<AppDispatch> {
	return (dispatch) => {
		const isInStatus = filters.status.includes(value);
		let newState;
		if (!isInStatus) {
			newState = [...filters.status, value];
		}
		if (isInStatus) {
			newState = filters.status.filter((item) => item !== value);
		}
		dispatch(debtsSlice.actions.setDebtStatusFilters(newState));
	};
}

export function addValueToDebtFilter(filters: IDebtsState['filters'], key: string, value: string): Dispatch<AppDispatch> {
	return (dispatch) => {
		dispatch(debtsSlice.actions.setDebtValueFilters({ value, key }));
	};
}
