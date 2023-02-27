import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDebtState } from '@src/store/debt/types';
import { IDebtHistoryItem } from '@src/types/debt.types';

const initialState: IDebtState = {
	debt: null,
	isLoading: false,
	debtHistory: {
		isLoading: true,
		list: [],
	},
};

export const debtSlice = createSlice({
	name: 'debt',
	initialState,
	reducers: {
		debtHistoryRequest: (state) => {
			state.debtHistory.isLoading = true;
		},
		debtHistoryRequestSuccess: (state, action: PayloadAction<IDebtHistoryItem[]>) => {
			state.debtHistory.list = action.payload;
			state.debtHistory.isLoading = false;
		},
		debtHistoryRequestEnd: (state) => {
			state.debtHistory.isLoading = false;
		},
	},
});
export const { debtHistoryRequest, debtHistoryRequestSuccess, debtHistoryRequestEnd } = debtSlice.actions;
