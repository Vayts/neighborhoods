import { SagaIterator } from 'redux-saga';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';
import { selectUser } from '@src/store/auth/user/selectors';
import { getRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { ERRORS } from '@constants/errors';
import { tokenExpired } from '@src/store/auth/user/sagas';
import { errorManager } from '@src/api/errorManager';
import {
	currentNeighborhoodRequest,
	currentNeighborhoodRequestError,
	setCurrentNeighborhood,
} from '@src/store/currentNeighborhood/reducer';
import { getNeighborhoodRequest } from '@src/store/currentNeighborhood/actions';
import { setNeighborhoodToSessionStorage } from '@helpers/sessionStorage.helper';

function* workerCurrentNeighborhood(action) {
	const { _id } = action.payload;
	try {
		yield put(currentNeighborhoodRequest());
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		const response = yield call(getRequest, `${ROUTES.currentNeighborhood}/${_id}`, axiosPrivate);
		if (response.data[0]) {
			yield put(setCurrentNeighborhood(response.data[0]));
			setNeighborhoodToSessionStorage(response.data[0]);
		}
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, () => getNeighborhoodRequest(_id));
		} else {
			errorManager(e);
			yield put(currentNeighborhoodRequestError());
		}
	}
}
export function* watchCurrentNeighborhood(): SagaIterator {
	yield takeLatest(getNeighborhoodRequest, workerCurrentNeighborhood);
}
