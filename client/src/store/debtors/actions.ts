import { Dispatch } from 'react';
import { AppDispatch } from '@src/store';
import { Axios } from 'axios';
import i18n from '@src/i18n';
import { getNotification } from '@src/notification/notifications';
import { IDebtorsState } from '@src/store/debtors/types';
import { debtorsSlice } from '@src/store/debtors/reducer';
import { IDebt } from '@src/types/debt.types';

export function userDebtorsRequest(
	axiosPrivate: Axios,
	controller: AbortController,
	setLoading: (state: boolean) => void,
	id: string,
	filters: IDebtorsState['filters'],
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		setLoading(true);
		try {
			const response = await axiosPrivate.get(`neighborhood/debtors/${id}?debtors=${filters.debtors.length ? filters.debtors.concat('') : ''}&status=${filters.status.length ? filters.status.concat('') : ''}&min=${filters.minValue}&max=${filters.maxValue}`, {
				signal: controller.signal,
			});
			dispatch(debtorsSlice.actions.setCurrentDebtors(response.data));
		} catch (e) {
			if (e.response?.data?.message !== 'NOT_AUTHORIZED' && e.response.code !== 'ERR_CANCELED') {
				getNotification(t('smtWntWrng'), 'error');
			}
		} finally {
			setLoading(false);
		}
	};
}

export function addDebtorToDebtorsFilter(filters: IDebtorsState['filters'], value: string): Dispatch<AppDispatch> {
	return (dispatch) => {
		const isInAuthors = filters.debtors.includes(value);
		let newState;
		if (!isInAuthors) {
			newState = [...filters.debtors, value];
		}
		if (isInAuthors) {
			newState = filters.debtors.filter((item) => item !== value);
		}
		dispatch(debtorsSlice.actions.setDebtorsDebtorFilters(newState));
	};
}

export function addStatusToDebtorsFilter(filters: IDebtorsState['filters'], value: string): Dispatch<AppDispatch> {
	return (dispatch) => {
		const isInStatus = filters.status.includes(value);
		let newState;
		if (!isInStatus) {
			newState = [...filters.status, value];
		}
		if (isInStatus) {
			newState = filters.status.filter((item) => item !== value);
		}
		dispatch(debtorsSlice.actions.setDebtorsStatusFilters(newState));
	};
}

export function addValueToDebtorsFilter(filters: IDebtorsState['filters'], key: string, value: string): Dispatch<AppDispatch> {
	return (dispatch) => {
		dispatch(debtorsSlice.actions.setDebtorsValueFilters({ value, key }));
	};
}

export function closeDebtRequest(
	axiosPrivate: Axios,
	setLoading: (state: boolean) => void,
	debtId: string,
	debts: IDebt[],
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		try {
			setLoading(true);
			const response = await axiosPrivate.get(`neighborhood/close_debt/${debtId}`);
			if (response.data) {
				const newState = debts.map((item) => {
					if (item._id === debtId) {
						return {
							...item,
							status: true,
						};
					}
					return item;
				});
				getNotification(t('debtSccssClosed'), 'success');
				dispatch(debtorsSlice.actions.setCurrentDebtors(newState));
			}
		} catch {
			getNotification(t('smtWntWrng'), 'error');
		} finally {
			setLoading(false);
		}
	};
}
