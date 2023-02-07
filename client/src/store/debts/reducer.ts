import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IDebtsState, IDebtValueState } from '@src/store/debts/types';
import { IDebt } from '@src/types/debt.types';

const initialState: IDebtsState = {
	list: [],
	filters: {
		authors: [],
		status: [],
		minValue: '',
		maxValue: '',
	},
};

export const debtsSlice = createSlice({
	name: 'debts',
	initialState,
	reducers: {
		setCurrentDebts: (state, action: PayloadAction<IDebt[]>) => {
			state.list = action.payload;
		},
		setDebtAuthorFilters: (state, action: PayloadAction<IDebtsState['filters']['authors']>) => {
			state.filters.authors = action.payload;
		},
		setDebtStatusFilters: (state, action: PayloadAction<IDebtsState['filters']['status']>) => {
			state.filters.status = action.payload;
		},
		setDebtValueFilters: (state, action: PayloadAction<IDebtValueState>) => {
			state.filters[action.payload.key] = action.payload.value;
		},
		resetDebtFilters: (state) => {
			state.filters = initialState.filters;
		},
	},
});
