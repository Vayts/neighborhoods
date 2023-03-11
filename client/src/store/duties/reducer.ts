import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDutiesState } from '@src/store/duties/types';
import { IDuty } from '@src/types/duty.types';

const initialState: IDutiesState = {
	data: {
		list: [],
	},
	isLoading: true,
	minorIsLoading: false,
};

export const dutiesSlice = createSlice({
	name: 'duties',
	initialState,
	reducers: {
		setDuties: (state, action: PayloadAction<IDuty[]>) => {
			state.data.list = action.payload;
		},
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
		minorDutiesRequestStart: (state) => {
			state.minorIsLoading = true;
		},
		minorDutiesRequestEnd: (state) => {
			state.minorIsLoading = false;
		},
	},
});

export const {
	dutiesRequestStart,
	dutiesRequestEnd,
	dutiesRequestSuccess,
	setDuties,
	minorDutiesRequestStart,
	minorDutiesRequestEnd,
} = dutiesSlice.actions;
