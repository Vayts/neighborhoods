import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import { addMarkRequest, addRequestToDuty, getDutiesRequest } from '@src/store/duties/actions';
import { ERRORS } from '@constants/errors';
import { tokenExpired } from '@src/store/auth/user/sagas';
import { errorManager } from '@src/api/errorManager';
import { SagaIterator } from 'redux-saga';
import {
	dutiesRequestEnd,
	dutiesRequestStart,
	dutiesRequestSuccess,
	minorDutiesRequestEnd,
	minorDutiesRequestStart,
	setDuties,
} from '@src/store/duties/reducer';
import { selectUser } from '@src/store/auth/user/selectors';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';
import { getRequest, postRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { selectDuties } from '@src/store/duties/selectors';
import { resetModal } from '@src/store/base/reducer';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';

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

function* addMarkSaga(action): SagaIterator {
	const { dutyId, neighborhoodId, date } = action.payload;
	try {
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		const response = yield call(postRequest, `${ROUTES.duty.addMark}/${neighborhoodId}/${dutyId}`, { date }, axiosPrivate);
		const duties = yield select(selectDuties);
		const newState = duties.map((item) => {
			if (item._id === response.data._id) {
				return response.data;
			}
			return item;
		});
		yield put(setDuties(newState));
		yield put(resetModal());
		getNotification(i18n.t('dutyMarkNotification'));
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, () => addMarkRequest(dutyId, neighborhoodId, date));
		} else {
			errorManager(e);
			yield put(dutiesRequestEnd());
		}
	}
}

function* addDutyRequestSaga(action): SagaIterator {
	const { dutyId, neighborhoodId, date, recipient } = action.payload;
	try {
		yield put(minorDutiesRequestStart());
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		const response = yield call(postRequest, `${ROUTES.duty.addRequest}/${neighborhoodId}/${dutyId}`, { date, recipient: recipient?.value || null }, axiosPrivate);
		const duties = yield select(selectDuties);
		const newState = duties.map((item) => {
			if (item._id === response.data._id) {
				return response.data;
			}
			return item;
		});
		yield put(setDuties(newState));
		yield put(minorDutiesRequestEnd());
		yield put(resetModal());
		getNotification(i18n.t('dutyRequestNotification'));
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, () => addRequestToDuty(dutyId, neighborhoodId, date, recipient));
		} else {
			errorManager(e);
			yield put(minorDutiesRequestEnd());
		}
	}
}

export function* watchDuties(): SagaIterator {
	yield takeLatest(getDutiesRequest, dutiesSaga);
	yield takeEvery(addMarkRequest, addMarkSaga);
	yield takeEvery(addRequestToDuty, addDutyRequestSaga);
}
