import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getDutiesRequest } from '@src/store/duties/actions';
import { ERRORS } from '@constants/errors';
import { tokenExpired } from '@src/store/auth/user/sagas';
import { errorManager } from '@src/api/errorManager';
import { SagaIterator } from 'redux-saga';
import { dutiesRequestEnd, dutiesRequestStart, dutiesRequestSuccess } from '@src/store/duties/reducer';
import { selectUser } from '@src/store/auth/user/selectors';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';
import { getRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';

function* dutiesSaga(action): SagaIterator {
	const { neighborhoodId } = action.payload;
	try {
		yield put(dutiesRequestStart());
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		const response = yield call(getRequest, `${ROUTES.duty.getDuties}/${neighborhoodId}`, axiosPrivate);
		yield put(dutiesRequestSuccess(response.data));
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, () => getDutiesRequest(neighborhoodId));
		} else {
			errorManager(e);
			yield put(dutiesRequestEnd());
		}
	}
}

export function* watchDuties(): SagaIterator {
	yield takeLatest(getDutiesRequest, dutiesSaga);
}
