import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { INeighborhoodsState } from '@src/store/neighborhoods/types';
import { IDebt, INeighborhood } from '@src/types/neighborhood.types';

const initialState: INeighborhoodsState = {
	neighborhoods: [],
	currentDebts: [],
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
			state.currentDebts = action.payload;
		},
		setCurrentNeighborhood: (state, action: PayloadAction<INeighborhood>) => {
			state.currentNeighborhood = action.payload;
		},
	},
});
