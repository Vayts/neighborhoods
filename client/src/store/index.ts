import { configureStore } from '@reduxjs/toolkit';
import { loginSlice } from '@src/store/auth/login/reducer';
import { baseSlice } from '@src/store/base/reducer';
import { neighborhoodsSlice } from '@src/store/neighborhoods/reducer';
import { debtsSlice } from '@src/store/debts/reducer';
import { createDebtSlice } from '@src/store/createDebt/reducer';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '@src/store/saga';
import { registerSlice } from '@src/store/auth/register/reducer';
import { userSlice } from '@src/store/auth/user/reducer';
import { currentNeighborhoodSlice } from '@src/store/currentNeighborhood/reducer';
import { debtSlice } from '@src/store/debt/reducer';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
	reducer: {
		base: baseSlice.reducer,
		login: loginSlice.reducer,
		register: registerSlice.reducer,
		user: userSlice.reducer,
		neighborhoods: neighborhoodsSlice.reducer,
		currentNeighborhood: currentNeighborhoodSlice.reducer,
		debts: debtsSlice.reducer,
		debt: debtSlice.reducer,
		createDebt: createDebtSlice.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
