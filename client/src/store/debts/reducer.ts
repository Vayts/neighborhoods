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
	debtsFirstLoad: true,
	debtorsFirstLoad: true,
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
			state.filters.status = action.payload.status;
			state.filters.users = action.payload.users;
			state.filters.maxValue = action.payload.maxValue;
			state.filters.minValue = action.payload.minValue;
		},
		setUpdateValue: (state) => {
			state.updateValue = Date.now();
		},
		resetDebtFilters: (state) => {
			state.filters = initialState.filters;
			state.debtorsFirstLoad = true;
			state.debtsFirstLoad = true;
		},
		debtsFirstLoadEnd: (state) => {
			state.debtsFirstLoad = false;
		},
		debtorsFirstLoadEnd: (state) => {
			state.debtorsFirstLoad = false;
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
	debtsFirstLoadEnd,
	debtorsFirstLoadEnd,
} = debtsSlice.actions;
