import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { INeighborhoodsState } from '@src/store/neighborhoods/types';
import { INeighborhood } from '@src/types/neighborhood.types';

const initialState: INeighborhoodsState = {
	neighborhoods: [],
	isLoading: true,
};

export const neighborhoodsSlice = createSlice({
	name: 'neighborhoods',
	initialState,
	reducers: {
		setNeighborhoods: (state, action: PayloadAction<INeighborhood[]>) => {
			state.neighborhoods = action.payload;
			state.isLoading = false;
		},
		neighborhoodsRequest: (state) => {
			state.isLoading = true;
		},
		neighborhoodsRequestError: (state) => {
			state.isLoading = false;
		},
	},
});
export const { neighborhoodsRequest, setNeighborhoods, neighborhoodsRequestError } = neighborhoodsSlice.actions;
