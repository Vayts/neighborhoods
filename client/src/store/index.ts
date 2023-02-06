import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '@src/store/auth/reducer';
import { baseSlice } from '@src/store/base/reducer';
import { dashboardSlice } from '@src/store/dashboard/reducer';
import { neighborhoodsSlice } from '@src/store/neighborhoods/reducer';

export const store = configureStore({
	reducer: {
		base: baseSlice.reducer,
		auth: authSlice.reducer,
		dashboard: dashboardSlice.reducer,
		neighborhoods: neighborhoodsSlice.reducer,
	},
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
