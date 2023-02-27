import { takeLatest, call, select, put } from 'redux-saga/effects';
import { getRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { SagaIterator } from 'redux-saga';
import { refreshRequest, refreshRequestError, refreshRequestSuccess, setUser } from '@src/store/auth/user/reducer';
import { axiosPrivate } from '@src/api/axios';
import { logoutRequest, tokenExpiredErrorRequest } from '@src/store/auth/user/action';
import { selectUser } from '@src/store/auth/user/selectors';
import { errorManager } from '@src/api/errorManager';

export function* workerUser(): SagaIterator {
	try {
		const response = yield call(getRequest, ROUTES.refresh, axiosPrivate);
		yield put(setUser(response.data));
		yield put(refreshRequestSuccess());
	} catch (e) {
		yield put(refreshRequestError());
	}
}

export function* logoutSaga(): SagaIterator {
	try {
		yield call(getRequest, ROUTES.logout);
		yield put(setUser(null));
	} catch (e) {
		errorManager(e);
	}
}

export function* tokenExpired(action: () => any): SagaIterator {
	yield call(workerUser);
	const user = yield select(selectUser);
	if (user.token) {
		yield put(action());
	}
}

export function* watchUser(): SagaIterator {
	yield takeLatest(refreshRequest, workerUser);
	yield takeLatest(tokenExpiredErrorRequest, workerUser);
	yield takeLatest(logoutRequest, logoutSaga);
}
