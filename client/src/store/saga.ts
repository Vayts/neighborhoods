import { all, fork } from 'redux-saga/effects';
import { watchLogin } from '@src/store/auth/login/sagas';
import { SagaIterator } from 'redux-saga';
import { watchRegister } from '@src/store/auth/register/sagas';
import { watchUser } from '@src/store/auth/user/sagas';
import { watchNeighborhoods } from '@src/store/neighborhoods/sagas';
import { watchCurrentNeighborhood } from '@src/store/currentNeighborhood/sagas';
import { watchDebts } from '@src/store/debts/sagas';
import { watchDebt } from '@src/store/debt/sagas';
import { watchCreateDebt } from '@src/store/createDebt/sagas';
import { watchApp } from '@src/store/base/sagas';

const sagas = [
	watchApp,
	watchLogin,
	watchRegister,
	watchUser,
	watchNeighborhoods,
	watchDebts,
	watchCurrentNeighborhood,
	watchDebt,
	watchCreateDebt,
];

export default function* rootSaga(): SagaIterator {
	yield all(sagas.map(fork));
}
