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
	isLoading: true,
	minorIsLoading: false,
	updateValue: null,
};

export const debtsSlice = createSlice({
	name: 'debts',
	initialState,
	reducers: {
		setCurrentDebts: (state, action: PayloadAction<IDebt[]>) => {
			state.list = action.payload;
		},
		debtRequestStart: (state) => {
			state.isLoading = true;
		},
		debtRequestEnd: (state) => {
			state.isLoading = false;
		},
		minorDebtRequestStart: (state) => {
			state.minorIsLoading = true;
		},
		minorDebtRequestEnd: (state) => {
			state.minorIsLoading = false;
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

export const {
	setFullFilters,
	setDebtValueFilters,
	resetDebtFilters,
	debtRequestEnd,
	debtRequestStart,
	setCurrentDebts,
	setUpdateValue,
	minorDebtRequestEnd,
	minorDebtRequestStart,
} = debtsSlice.actions;
