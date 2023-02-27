import { takeLatest, call, select, put } from 'redux-saga/effects';
import { postRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { SagaIterator } from 'redux-saga';
import { selectRegisterData } from '@src/store/auth/register/selectors';
import { setUser } from '@src/store/auth/user/reducer';
import { registerRequest, registerRequestError, registerRequestSuccess } from '@src/store/auth/register/reducer';
import { axiosPrivate } from '@src/api/axios';

function* workerRegister(): SagaIterator {
	try {
		const data = yield select(selectRegisterData);
		const response = yield call(postRequest, ROUTES.register, data, axiosPrivate);
		yield put(setUser(response.data));
		yield put(registerRequestSuccess());
	} catch (e) {
		yield put(registerRequestError());
	}
}

export function* watchRegister(): SagaIterator {
	yield takeLatest(registerRequest, workerRegister);
}
