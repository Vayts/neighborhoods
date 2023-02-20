import { Dispatch } from 'react';
import { AppDispatch } from '@src/store';
import { Axios } from 'axios';
import i18n from '@src/i18n';
import { getNotification } from '@src/notification/notifications';
import { debtsSlice } from '@src/store/debts/reducer';
import { IDebtsState } from '@src/store/debts/types';
import { IDebt, IEditDebtState } from '@src/types/debt.types';
import { baseSlice } from '@src/store/base/reducer';

export function userDebtsRequest(
	axiosPrivate: Axios,
	controller: AbortController,
	setLoading: (state: boolean) => void,
	id: string,
	filters: IDebtsState['filters'],
	isDebtors: boolean,
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		setLoading(true);
		try {
			let link;

			if (!isDebtors) {
				link = `debt/debts/${id}?authors=${filters.users.length ? filters.users.concat('') : ''}&status=${filters.status.length ? filters.status.concat('') : ''}&min=${filters.minValue}&max=${filters.maxValue}`;
			} else {
				link = `debt/debtors/${id}?debtors=${filters.users.length ? filters.users.concat('') : ''}&status=${filters.status.length ? filters.status.concat('') : ''}&min=${filters.minValue}&max=${filters.maxValue}`;
			}
			
			const response = await axiosPrivate.get(link, { signal: controller.signal });
			dispatch(debtsSlice.actions.setCurrentDebts(response.data));
		} catch (e) {
			if (e.response?.data?.message !== 'NOT_AUTHORIZED' && e?.code !== 'ERR_CANCELED') {
				getNotification(t('smtWntWrng'), 'error');
			}
		} finally {
			setLoading(false);
		}
	};
}

export function addUserToDebtFilter(filters: IDebtsState['filters'], value: string): Dispatch<AppDispatch> {
	return (dispatch) => {
		const isInAuthors = filters.users.includes(value);
		let newState;
		if (!isInAuthors) {
			newState = [...filters.users, value];
		}
		if (isInAuthors) {
			newState = filters.users.filter((item) => item !== value);
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
			const response = await axiosPrivate.post(`debt/close_debt/${debtId}`);
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
				dispatch(debtsSlice.actions.setCurrentDebts(newState));
				dispatch(baseSlice.actions.resetModal());
			}
		} catch {
			getNotification(t('smtWntWrng'), 'error');
		} finally {
			setLoading(false);
		}
	};
}

export function reopenDebtRequest(
	axiosPrivate: Axios,
	setLoading: (state: boolean) => void,
	debtId: string,
	debts: IDebt[],
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		try {
			setLoading(true);
			const response = await axiosPrivate.post(`debt/reopen_debt/${debtId}`);
			if (response.data) {
				const newState = debts.map((item) => {
					if (item._id === debtId) {
						return {
							...item,
							status: false,
						};
					}
					return item;
				});
				getNotification(t('debtSccssReopen'), 'success');
				dispatch(debtsSlice.actions.setCurrentDebts(newState));
				dispatch(baseSlice.actions.resetModal());
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
	debts: IDebt[],
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
				const newState = debts.map((item) => {
					if (item._id === debtId) {
						return {
							...item,
							value: response.data.value,
						};
					}
					return item;
				});
				getNotification(t('partialPaymentWasAdded'), 'success');
				dispatch(debtsSlice.actions.setCurrentDebts(newState));
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
	debts: IDebt[],
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
				const newState = debts.map((item) => {
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
				dispatch(debtsSlice.actions.setCurrentDebts(newState));
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
	debts: IDebt[],
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
				const newState = debts.map((item) => {
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
				dispatch(debtsSlice.actions.setCurrentDebts(newState));
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
	debts: IDebt[],
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		try {
			setLoading(true);
			const response = await axiosPrivate.delete(`debt/delete_debt/${neighborhoodId}/${debtId}`);
			if (response.data._id === debtId) {
				const newState = debts.filter((item) => {
					if (item._id !== debtId) {
						return item;
					}
					return null;
				});
				getNotification(t('deleteDebtNotification'), 'success');
				dispatch(debtsSlice.actions.setCurrentDebts(newState));
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
	debts: IDebt[],
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		setLoading(true);
		try {
			const response = await axiosPrivate.post(`debt/edit_debt/${neighborhoodId}/${debtId}`, {
				...values,
			});
			if (response.data._id === debtId) {
				const newState = debts.map((item) => {
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
				dispatch(debtsSlice.actions.setCurrentDebts(newState));
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
