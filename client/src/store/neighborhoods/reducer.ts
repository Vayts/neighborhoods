import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IDebtValueState, INeighborhoodsState } from '@src/store/neighborhoods/types';
import { IDebt, INeighborhood } from '@src/types/neighborhood.types';

const initialState: INeighborhoodsState = {
	neighborhoods: [],
	currentDebts: {
		debts: [],
		filters: {
			authors: [],
			status: [],
			minValue: '',
			maxValue: '',
		},
	},
	currentNeighborhood: null,
};

export const neighborhoodsSlice = createSlice({
	name: 'base',
	initialState,
	reducers: {
		setNeighborhoods: (state, action: PayloadAction<INeighborhood[]>) => {
			state.neighborhoods = action.payload;
		},
		setCurrentDebts: (state, action: PayloadAction<IDebt[]>) => {
			state.currentDebts.debts = action.payload;
		},
		setCurrentNeighborhood: (state, action: PayloadAction<INeighborhood>) => {
			state.currentNeighborhood = action.payload;
		},
		setDebtAuthorFilters: (state, action: PayloadAction<INeighborhoodsState['currentDebts']['filters']['authors']>) => {
			state.currentDebts.filters.authors = action.payload;
		},
		setDebtStatusFilters: (state, action: PayloadAction<INeighborhoodsState['currentDebts']['filters']['status']>) => {
			state.currentDebts.filters.status = action.payload;
		},
		setDebtValueFilters: (state, action: PayloadAction<IDebtValueState>) => {
			state.currentDebts.filters[action.payload.key] = action.payload.value;
		},
		resetDebtFilters: (state) => {
			state.currentDebts.filters = initialState.currentDebts.filters;
		},
	},
});
