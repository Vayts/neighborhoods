import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IDebt } from '@src/types/debt.types';
import { IDebtorsState, IDebtorsValueState } from '@src/store/debtors/types';

const initialState: IDebtorsState = {
	list: [],
	filters: {
		debtors: [],
		status: [],
		minValue: '',
		maxValue: '',
	},
	updateValue: null,
};

export const debtorsSlice = createSlice({
	name: 'debtors',
	initialState,
	reducers: {
		setCurrentDebtors: (state, action: PayloadAction<IDebt[]>) => {
			state.list = action.payload;
		},
		setDebtorsDebtorFilters: (state, action: PayloadAction<IDebtorsState['filters']['debtors']>) => {
			state.filters.debtors = action.payload;
		},
		setDebtorsStatusFilters: (state, action: PayloadAction<IDebtorsState['filters']['status']>) => {
			state.filters.status = action.payload;
		},
		setDebtorsValueFilters: (state, action: PayloadAction<IDebtorsValueState>) => {
			state.filters[action.payload.key] = action.payload.value;
		},
		setUpdateValue: (state) => {
			state.updateValue = Date.now();
		},
		resetDebtorsFilters: (state) => {
			state.filters = initialState.filters;
		},
	},
});
