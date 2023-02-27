import { call, put, takeLatest } from 'redux-saga/effects';
import { appIsLoaded, loadApp } from '@src/store/base/reducer';
import { workerUser } from '@src/store/auth/user/sagas';
import { SagaIterator } from 'redux-saga';
import { getNeighborhoodFromSessionStorage } from '@helpers/sessionStorage.helper';
import { setCurrentNeighborhood } from '@src/store/currentNeighborhood/reducer';

export function* workerFirstLoadApp(): SagaIterator {
	yield call(workerUser);
	yield put(appIsLoaded());
	const data = getNeighborhoodFromSessionStorage();
	if (data) yield put(setCurrentNeighborhood(data));
}
export function* watchApp() {
	yield takeLatest(loadApp, workerFirstLoadApp);
}
