import { Axios } from 'axios';
import { Dispatch } from 'react';
import { AppDispatch } from '@src/store';
import i18n from '@src/i18n';
import { getNotification } from '@src/notification/notifications';
import { ICreateDebt } from '@src/store/createDebt/types';
import { debtorsSlice } from '@src/store/debtors/reducer';
import { baseSlice } from '@src/store/base/reducer';

export function createDebtRequest(
	axiosPrivate: Axios,
	setLoading: (state: boolean) => void,
	values: ICreateDebt['form'],
	neighborhoodId: string,
): Dispatch<AppDispatch> {
	return async (dispatch) => {
		const t = i18n.t;
		setLoading(true);
		try {
			await axiosPrivate.post(`debt/${neighborhoodId}/create_debt`, {
				...values,
				debtor: values.debtor.value,
				value: Number(values.value),
			});
			dispatch(debtorsSlice.actions.setUpdateValue());
			dispatch(baseSlice.actions.resetModal());
			getNotification(t('debtHasBeenCreated'), 'success');
		} catch (e) {
			if (e.response?.data?.message !== 'NOT_AUTHORIZED') {
				getNotification(t('smtWntWrng'), 'error');
			}
		} finally {
			setLoading(false);
		}
	};
}
