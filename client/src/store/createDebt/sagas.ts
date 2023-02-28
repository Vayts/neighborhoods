import { call, put, select, takeLatest } from 'redux-saga/effects';
import { selectUser } from '@src/store/auth/user/selectors';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';
import { postRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { ERRORS } from '@constants/errors';
import { tokenExpired } from '@src/store/auth/user/sagas';
import { errorManager } from '@src/api/errorManager';
import { SagaIterator } from 'redux-saga';
import { createDebtRequest } from '@src/store/createDebt/action';
import { createDebtRequestEnd, createDebtRequestStart } from '@src/store/createDebt/reducer';
import { setUpdateValue } from '@src/store/debts/reducer';
import { resetModal } from '@src/store/base/reducer';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';

function* createDebtSaga(action) {
	const { values, neighborhoodId } = action.payload;
	try {
		yield put(createDebtRequestStart());
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		yield call(postRequest, `${ROUTES.createDebt}/${neighborhoodId}`, { ...values, debtor: values.debtor.value }, axiosPrivate);
		yield put(createDebtRequestEnd());
		yield put(setUpdateValue());
		yield put(resetModal());
		getNotification(i18n.t('debtHasBeenCreated'));
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, () => createDebtRequest(values, neighborhoodId));
		} else {
			errorManager(e);
			yield put(createDebtRequestEnd());
		}
	}
}
export function* watchCreateDebt(): SagaIterator {
	yield takeLatest(createDebtRequest, createDebtSaga);
}
