import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IDebtsState, IDebtValueState } from '@src/store/debts/types';
import { IDebt } from '@src/types/debt.types';

const initialState: IDebtsState = {
	list: [],
	filters: {
		users: [],
		status: [],
		minValue: '',
		maxValue: '',
	},
	updateValue: null,
};

export const debtsSlice = createSlice({
	name: 'debts',
	initialState,
	reducers: {
		setCurrentDebts: (state, action: PayloadAction<IDebt[]>) => {
			state.list = action.payload;
		},
		setDebtAuthorFilters: (state, action: PayloadAction<IDebtsState['filters']['users']>) => {
			state.filters.users = action.payload;
		},
		setDebtStatusFilters: (state, action: PayloadAction<IDebtsState['filters']['status']>) => {
			state.filters.status = action.payload;
		},
		setDebtValueFilters: (state, action: PayloadAction<IDebtValueState>) => {
			state.filters[action.payload.key] = action.payload.value;
		},
		setFullFilters: (state, action: PayloadAction<IDebtsState['filters']>) => {
			state.filters = action.payload;
		},
		setUpdateValue: (state) => {
			state.updateValue = Date.now();
		},
		resetDebtFilters: (state) => {
			state.filters = initialState.filters;
		},
	},
});
