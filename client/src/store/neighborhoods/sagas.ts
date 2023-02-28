import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { neighborhoodsRequest, neighborhoodsRequestError, setNeighborhoods } from '@src/store/neighborhoods/reducer';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';
import { selectUser } from '@src/store/auth/user/selectors';
import { getRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { ERRORS } from '@constants/errors';
import { tokenExpired } from '@src/store/auth/user/sagas';
import { errorManager } from '@src/api/errorManager';

function* workerNeighborhoods() {
	try {
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		const response = yield call(getRequest, ROUTES.userNeighborhoods, axiosPrivate);
		yield put(setNeighborhoods(response.data));
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, neighborhoodsRequest);
		} else {
			errorManager(e);
			yield put(neighborhoodsRequestError());
		}
	}
}
export function* watchNeighborhoods(): SagaIterator {
	yield takeLatest(neighborhoodsRequest, workerNeighborhoods);
}
