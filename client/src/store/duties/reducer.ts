import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDutiesState } from '@src/store/duties/types';
import { IDuty } from '@src/types/duty.types';

const initialState: IDutiesState = {
	data: {
		list: [],
	},
	isLoading: true,
};

export const dutiesSlice = createSlice({
	name: 'duties',
	initialState,
	reducers: {
		dutiesRequestStart: (state) => {
			state.isLoading = true;
		},
		dutiesRequestSuccess: (state, action: PayloadAction<IDuty[]>) => {
			state.isLoading = false;
			state.data.list = action.payload;
		},
		dutiesRequestEnd: (state) => {
			state.isLoading = false;
		},
	},
});

export const { dutiesRequestStart, dutiesRequestEnd, dutiesRequestSuccess } = dutiesSlice.actions;
