import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { INeighborhood } from '@src/types/neighborhood.types';
import { ICurrentNeighborhoodState } from '@src/store/currentNeighborhood/types';

const initialState: ICurrentNeighborhoodState = {
	neighborhood: null,
	isLoading: true,
};

export const currentNeighborhoodSlice = createSlice({
	name: 'currentNeighborhood',
	initialState,
	reducers: {
		setCurrentNeighborhood: (state, action: PayloadAction<INeighborhood>) => {
			state.neighborhood = action.payload;
			state.isLoading = false;
		},
		currentNeighborhoodRequest: (state) => {
			state.isLoading = true;
		},
		currentNeighborhoodRequestError: (state) => {
			state.isLoading = false;
		},
	},
});
export const { setCurrentNeighborhood, currentNeighborhoodRequestError, currentNeighborhoodRequest } = currentNeighborhoodSlice.actions;
