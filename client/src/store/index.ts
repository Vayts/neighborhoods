import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@src/store/auth/reducer';
import { baseSlice } from '@src/store/base/reducer';
import { dashboardSlice } from '@src/store/dashboard/reducer';
import { neighborhoodsSlice } from '@src/store/neighborhoods/reducer';
import { debtsSlice } from '@src/store/debts/reducer';
import { debtorsSlice } from '@src/store/debtors/reducer';
import { createDebtSlice } from '@src/store/createDebt/reducer';

export const store = configureStore({
	reducer: {
		base: baseSlice.reducer,
		auth: authSlice.reducer,
		dashboard: dashboardSlice.reducer,
		neighborhoods: neighborhoodsSlice.reducer,
		debts: debtsSlice.reducer,
		debtors: debtorsSlice.reducer,
		createDebt: createDebtSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
