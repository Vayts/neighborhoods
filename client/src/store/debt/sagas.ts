import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';
import { selectUser } from '@src/store/auth/user/selectors';
import { getRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { ERRORS } from '@constants/errors';
import { tokenExpired } from '@src/store/auth/user/sagas';
import { errorManager } from '@src/api/errorManager';
import { getDebtHistory } from '@src/store/debt/actions';
import { debtHistoryRequest, debtHistoryRequestEnd, debtHistoryRequestSuccess } from '@src/store/debt/reducer';

function* workerDebtHistory(action) {
	const { debtId, neighborhoodId } = action.payload;
	try {
		yield put(debtHistoryRequest());
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		const response = yield call(getRequest, `${ROUTES.debtHistory}/${neighborhoodId}/${debtId}`, axiosPrivate);
		yield put(debtHistoryRequestSuccess(response.data));
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, () => getDebtHistory(debtId, neighborhoodId));
		} else {
			errorManager(e);
			yield put(debtHistoryRequestEnd());
		}
	}
}
export function* watchDebt(): SagaIterator {
	yield takeLatest(getDebtHistory, workerDebtHistory);
}
