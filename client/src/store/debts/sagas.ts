import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import {
	addStatusToDebtFilter, addUserToDebtFilter,
	closeDebtRequest, deleteDebtRequest, editDebtRequest, getDebtsFirstLoad,
	getDebtsRequest, increaseDebtRequest,
	partialPaymentRequest,
	reduceDebtRequest,
	reopenDebtRequest,
} from '@src/store/debts/actions';
import { ERRORS } from '@constants/errors';
import { tokenExpired } from '@src/store/auth/user/sagas';
import { errorManager } from '@src/api/errorManager';
import { selectCurrentDebts, selectCurrentDebtsFilters } from '@src/store/debts/selectors';
import {
	debtorsFirstLoadEnd,
	debtRequestEnd,
	debtRequestStart, debtsFirstLoadEnd,
	minorDebtRequestEnd,
	minorDebtRequestStart,
	setCurrentDebts, setFullFilters,
} from '@src/store/debts/reducer';
import { deleteRequest, getRequest, postRequest } from '@src/api/request';
import { ROUTES } from '@constants/routes';
import { SagaIterator } from 'redux-saga';
import { selectUser } from '@src/store/auth/user/selectors';
import { generateAxiosPrivate } from '@src/api/axiosPrivate';
import { resetModal } from '@src/store/base/reducer';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';
import { getDebtsFiltersFromSessionStorage } from '@helpers/sessionStorage.helper';

export function* workerDebts(action: Record<string, string | any>): SagaIterator {
	const { isDebtors, _id } = action.payload;
	
	try {
		const filters = yield select(selectCurrentDebtsFilters);
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		const link = `${isDebtors ? ROUTES.debtors : ROUTES.debts}/${_id}?users=${filters.users.length ? filters.users.concat('') : ''}&status=${filters.status.length ? filters.status.concat('') : ''}&min=${filters.minValue}&max=${filters.maxValue}`;
		yield put(debtRequestStart());
		const response = yield call(getRequest, link, axiosPrivate);
		yield put(setCurrentDebts(response.data));
		yield put(debtRequestEnd());
		if (isDebtors) yield put(debtorsFirstLoadEnd());
		if (!isDebtors) yield put(debtsFirstLoadEnd());
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, () => getDebtsRequest(_id, isDebtors));
		} else {
			errorManager(e);
			yield put(debtRequestEnd());
		}
	}
}

function* firstDebtsLoadSaga(action): SagaIterator {
	const { isDebtors, _id } = action.payload;
	const debtsFilters = getDebtsFiltersFromSessionStorage(_id, isDebtors);
	if (debtsFilters) yield put(setFullFilters(debtsFilters));
	yield call(workerDebts, action);
}

function* closeDebtSaga(action): SagaIterator {
	const { _id } = action.payload;
	try {
		const debts = yield select(selectCurrentDebts);
		yield put(minorDebtRequestStart());
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		yield call(postRequest, `${ROUTES.closeDebt}/${_id}`, null, axiosPrivate);
		const newState = debts.map((item) => {
			if (item._id === _id) {
				return {
					...item,
					status: true,
				};
			}
			return item;
		});
		yield put(setCurrentDebts(newState));
		getNotification(i18n.t('debtSccssClosed'));
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, () => closeDebtRequest(_id));
		} else {
			errorManager(e);
		}
	} finally {
		yield put(minorDebtRequestEnd());
		yield put(resetModal());
	}
}

function* reopenDebtSaga(action): SagaIterator {
	const { _id } = action.payload;
	try {
		const debts = yield select(selectCurrentDebts);
		yield put(minorDebtRequestStart());
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		yield call(postRequest, `${ROUTES.reopenDebt}/${_id}`, null, axiosPrivate);
		const newState = debts.map((item) => {
			if (item._id === _id) {
				return {
					...item,
					status: false,
				};
			}
			return item;
		});
		yield put(setCurrentDebts(newState));
		getNotification(i18n.t('debtSccssReopen'));
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, () => reopenDebtRequest(_id));
		} else {
			errorManager(e);
		}
	} finally {
		yield put(minorDebtRequestEnd());
		yield put(resetModal());
	}
}

function* partialPaymentSaga(action): SagaIterator {
	const { _id, value } = action.payload;
	try {
		const debts = yield select(selectCurrentDebts);
		yield put(minorDebtRequestStart());
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		const response = yield call(postRequest, `${ROUTES.partialPayment}/${_id}`, { partialPaymentValue: value }, axiosPrivate);
		const newState = debts.map((item) => {
			if (item._id === _id) {
				return {
					...item,
					value: response.data.value,
				};
			}
			return item;
		});
		yield put(setCurrentDebts(newState));
		getNotification(i18n.t('partialPaymentWasAdded'));
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, () => partialPaymentRequest(_id, value));
		} else {
			errorManager(e);
		}
	} finally {
		yield put(minorDebtRequestEnd());
		yield put(resetModal());
	}
}

function* reduceDebtSaga(action): SagaIterator {
	const { _id, value } = action.payload;
	try {
		const debts = yield select(selectCurrentDebts);
		yield put(minorDebtRequestStart());
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		const response = yield call(postRequest, `${ROUTES.reduceDebt}/${_id}`, { reduceValue: value }, axiosPrivate);
		const newState = debts.map((item) => {
			if (item._id === _id) {
				return {
					...item,
					value: response.data.value,
					initialValue: response.data.initialValue,
				};
			}
			return item;
		});
		yield put(setCurrentDebts(newState));
		getNotification(i18n.t('reduceDebtNotification'));
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, () => reduceDebtRequest(_id, value));
		} else {
			errorManager(e);
		}
	} finally {
		yield put(minorDebtRequestEnd());
		yield put(resetModal());
	}
}

function* increaseDebtSaga(action): SagaIterator {
	const { _id, value } = action.payload;
	try {
		const debts = yield select(selectCurrentDebts);
		yield put(minorDebtRequestStart());
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		const response = yield call(postRequest, `${ROUTES.increaseDebt}/${_id}`, { increaseValue: value }, axiosPrivate);
		const newState = debts.map((item) => {
			if (item._id === _id) {
				return {
					...item,
					value: response.data.value,
					initialValue: response.data.initialValue,
				};
			}
			return item;
		});
		yield put(setCurrentDebts(newState));
		getNotification(i18n.t('increaseDebtNotification'));
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, () => increaseDebtRequest(_id, value));
		} else {
			errorManager(e);
		}
	} finally {
		yield put(minorDebtRequestEnd());
		yield put(resetModal());
	}
}

function* deleteDebtSaga(action): SagaIterator {
	const { _id } = action.payload;
	try {
		const debts = yield select(selectCurrentDebts);
		yield put(minorDebtRequestStart());
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		yield call(deleteRequest, `${ROUTES.deleteDebt}/${_id}`, axiosPrivate);
		const newState = debts.filter((item) => item._id !== _id);
		yield put(setCurrentDebts(newState));
		getNotification(i18n.t('deleteDebtNotification'));
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, () => deleteDebtRequest(_id));
		} else {
			errorManager(e);
		}
	} finally {
		yield put(minorDebtRequestEnd());
		yield put(resetModal());
	}
}

function* editDebtSaga(action): SagaIterator {
	const { _id, values } = action.payload;
	try {
		const debts = yield select(selectCurrentDebts);
		yield put(minorDebtRequestStart());
		const user = yield select(selectUser);
		const axiosPrivate = generateAxiosPrivate(user);
		const response = yield call(postRequest, `${ROUTES.editDebt}/${_id}`, { ...values }, axiosPrivate);
		const newState = debts.map((item) => {
			if (item._id === _id) {
				return {
					...item,
					title: response.data.title,
					description: response.data.description,
					expDate: response.data.expDate,
				};
			}
			return item;
		});
		yield put(setCurrentDebts(newState));
		getNotification(i18n.t('editDebtNotification'));
	} catch (e) {
		if (e?.response?.data?.message === ERRORS.NOT_AUTHORIZED) {
			yield call(tokenExpired, () => editDebtRequest(_id, values));
		} else {
			errorManager(e);
		}
	} finally {
		yield put(minorDebtRequestEnd());
		yield put(resetModal());
	}
}

function* addStatusSaga(action): SagaIterator {
	const { value } = action.payload;
	try {
		const filters = yield select(selectCurrentDebtsFilters);
		const isInStatus = filters.status.includes(value);
		let newState;
		if (!isInStatus) {
			newState = [...filters.status, value];
		}
		if (isInStatus) {
			newState = filters.status.filter((item) => item !== value);
		}
		yield put(setFullFilters({ ...filters, status: newState }));
	} catch (e) {
		errorManager(e);
	}
}

function* addUserFilterSaga(action): SagaIterator {
	const { value } = action.payload;
	try {
		const filters = yield select(selectCurrentDebtsFilters);
		const isInAuthors = filters.users.includes(value);
		let newState;
		if (!isInAuthors) {
			newState = [...filters.users, value];
		}
		if (isInAuthors) {
			newState = filters.users.filter((item) => item !== value);
		}
		yield put(setFullFilters({ ...filters, users: newState }));
	} catch (e) {
		errorManager(e);
	}
}

export function* watchDebts(): SagaIterator {
	yield takeLatest(getDebtsRequest, workerDebts);
	yield takeEvery(closeDebtRequest, closeDebtSaga);
	yield takeEvery(reopenDebtRequest, reopenDebtSaga);
	yield takeEvery(partialPaymentRequest, partialPaymentSaga);
	yield takeEvery(reduceDebtRequest, reduceDebtSaga);
	yield takeEvery(increaseDebtRequest, increaseDebtSaga);
	yield takeEvery(deleteDebtRequest, deleteDebtSaga);
	yield takeEvery(editDebtRequest, editDebtSaga);
	yield takeLatest(addStatusToDebtFilter, addStatusSaga);
	yield takeLatest(addUserToDebtFilter, addUserFilterSaga);
	yield takeLatest(getDebtsFirstLoad, firstDebtsLoadSaga);
}
