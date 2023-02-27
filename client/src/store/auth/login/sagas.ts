import { takeLatest, call, select, put } from 'redux-saga/effects';
import { loginRequest, loginRequestError, loginRequestSuccess } from '@src/store/auth/login/reducer';
import { postRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { selectLoginData } from '@src/store/auth/login/selectors';
import { SagaIterator } from 'redux-saga';
import { setUser } from '@src/store/auth/user/reducer';
import { errorManager } from '@src/api/errorManager';
import { axiosPrivate } from '@src/api/axios';

function* workerLogin(): SagaIterator {
	try {
		const loginData = yield select(selectLoginData);
		const response = yield call(postRequest, ROUTES.login, loginData, axiosPrivate);
		console.log(response);
		yield put(setUser(response.data));
		yield put(loginRequestSuccess());
	} catch (e) {
		errorManager(e);
		yield put(loginRequestError());
	}
}

export function* watchLogin(): SagaIterator {
	yield takeLatest(loginRequest, workerLogin);
}
