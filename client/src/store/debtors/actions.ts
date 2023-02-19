import { Dispatch } from 'react';
import { AppDispatch } from '@src/store';
import { Axios } from 'axios';
import i18n from '@src/i18n';
import { getNotification } from '@src/notification/notifications';
import { IDebtorsState } from '@src/store/debtors/types';
import { debtorsSlice } from '@src/store/debtors/reducer';
import { IDebt, IEditDebtState } from '@src/types/debt.types';
import { baseSlice } from '@src/store/base/reducer';

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
			const response = await axiosPrivate.get(`debt/debtors/${id}?debtors=${filters.debtors.length ? filters.debtors.concat('') : ''}&status=${filters.status.length ? filters.status.concat('') : ''}&min=${filters.minValue}&max=${filters.maxValue}`, {
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
			const response = await axiosPrivate.get(`debt/close_debt/${debtId}`);
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

export function partialPaymentRequest(
	axiosPrivate: Axios,
	setLoading: (state: boolean) => void,
	neighborhoodId: string,
	debtId: string,
	debtors: IDebt[],
	partialPaymentValue: number,
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		try {
			setLoading(true);
			const response = await axiosPrivate.post(`debt/partial_payment/${neighborhoodId}/${debtId}`, {
				partialPaymentValue,
			});
			if (response.data._id === debtId) {
				const newState = debtors.map((item) => {
					if (item._id === debtId) {
						return {
							...item,
							value: response.data.value,
						};
					}
					return item;
				});
				getNotification(t('partialPaymentWasAdded'), 'success');
				dispatch(debtorsSlice.actions.setCurrentDebtors(newState));
				dispatch(baseSlice.actions.resetModal());
			}
		} catch (e) {
			getNotification(t('smtWntWrng'), 'error');
		} finally {
			setLoading(false);
		}
	};
}

export function reduceDebtRequest(
	axiosPrivate: Axios,
	setLoading: (state: boolean) => void,
	neighborhoodId: string,
	debtId: string,
	debtors: IDebt[],
	reduceValue: number,
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		try {
			setLoading(true);
			const response = await axiosPrivate.post(`debt/reduce_debt/${neighborhoodId}/${debtId}`, {
				reduceValue,
			});
			if (response.data._id === debtId) {
				const newState = debtors.map((item) => {
					if (item._id === debtId) {
						return {
							...item,
							initialValue: response.data.initialValue,
							value: response.data.value,
						};
					}
					return item;
				});
				getNotification(t('reduceDebtNotification'), 'success');
				dispatch(debtorsSlice.actions.setCurrentDebtors(newState));
				dispatch(baseSlice.actions.resetModal());
			}
		} catch (e) {
			getNotification(t('smtWntWrng'), 'error');
		} finally {
			setLoading(false);
		}
	};
}

export function increaseDebtRequest(
	axiosPrivate: Axios,
	setLoading: (state: boolean) => void,
	neighborhoodId: string,
	debtId: string,
	debtors: IDebt[],
	increaseValue: number,
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		try {
			setLoading(true);
			const response = await axiosPrivate.post(`debt/increase_debt/${neighborhoodId}/${debtId}`, {
				increaseValue,
			});
			if (response.data._id === debtId) {
				const newState = debtors.map((item) => {
					if (item._id === debtId) {
						return {
							...item,
							initialValue: response.data.initialValue,
							value: response.data.value,
						};
					}
					return item;
				});
				getNotification(t('increaseDebtNotification'), 'success');
				dispatch(debtorsSlice.actions.setCurrentDebtors(newState));
				dispatch(baseSlice.actions.resetModal());
			}
		} catch (e) {
			getNotification(t('smtWntWrng'), 'error');
		} finally {
			setLoading(false);
		}
	};
}

export function deleteDebtRequest(
	axiosPrivate: Axios,
	setLoading: (state: boolean) => void,
	neighborhoodId: string,
	debtId: string,
	debtors: IDebt[],
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		try {
			setLoading(true);
			const response = await axiosPrivate.delete(`debt/delete_debt/${neighborhoodId}/${debtId}`);
			if (response.data._id === debtId) {
				const newState = debtors.filter((item) => {
					if (item._id !== debtId) {
						return item;
					}
					return null;
				});
				getNotification(t('deleteDebtNotification'), 'success');
				dispatch(debtorsSlice.actions.setCurrentDebtors(newState));
				dispatch(baseSlice.actions.resetModal());
			}
		} catch (e) {
			getNotification(t('smtWntWrng'), 'error');
		} finally {
			setLoading(false);
		}
	};
}

export function updateDebtRequest(
	axiosPrivate: Axios,
	setLoading: (state: boolean) => void,
	values: IEditDebtState,
	neighborhoodId: string,
	debtId: string,
	debtors: IDebt[],
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		setLoading(true);
		try {
			const response = await axiosPrivate.post(`debt/edit_debt/${neighborhoodId}/${debtId}`, {
				...values,
			});
			if (response.data._id === debtId) {
				const newState = debtors.map((item) => {
					if (item._id === debtId) {
						return {
							...item,
							title: response.data.title,
							description: response.data.description,
							expDate: response.data.expDate,
						};
					}
					return item;
				});
				getNotification(t('editDebtNotification'), 'success');
				dispatch(debtorsSlice.actions.setCurrentDebtors(newState));
				dispatch(baseSlice.actions.resetModal());
			}
		} catch (e) {
			if (e.response?.data?.message !== 'NOT_AUTHORIZED') {
				getNotification(t('smtWntWrng'), 'error');
			}
		} finally {
			setLoading(false);
		}
	};
}
