import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { INeighborhoodsState } from '@src/store/neighborhoods/types';
import { INeighborhood } from '@src/types/neighborhood.types';

const initialState: INeighborhoodsState = {
	neighborhoods: [],
	currentNeighborhood: null,
};

export const neighborhoodsSlice = createSlice({
	name: 'base',
	initialState,
	reducers: {
		setNeighborhoods: (state, action: PayloadAction<INeighborhood[]>) => {
			state.neighborhoods = action.payload;
		},
		setCurrentNeighborhood: (state, action: PayloadAction<INeighborhood>) => {
			state.currentNeighborhood = action.payload;
		},
	},
});
