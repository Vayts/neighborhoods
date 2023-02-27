import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICreateDebt, ISetDebtValuePayload } from '@src/store/createDebt/types';
import { debtCreateValidate } from '@helpers/debtValidation.helper';

const initialState: ICreateDebt = {
	form: {
		expDate: null,
		title: '',
		debtor: null,
		value: '',
		description: '',
	},
	isLoading: false,
	neighborhood: null,
	errors: {},
	touched: {},
};

export const createDebtSlice = createSlice({
	name: 'createDebt',
	initialState,
	reducers: {
		setValueToCreateForm: (state, action: PayloadAction<ISetDebtValuePayload>) => {
			state.form[action.payload.name] = action.payload.value;
			state.errors = debtCreateValidate({
				...state.form,
				[action.payload.name]: action.payload.value,
			});
			state.touched = {
				...state.touched,
				[action.payload.name]: true,
			};
		},
		resetCreateDebt: (state) => {
			state.form = initialState.form;
			state.neighborhood = initialState.neighborhood;
			state.errors = initialState.errors;
			state.touched = initialState.touched;
		},
		createDebtRequestStart: (state) => {
			state.isLoading = true;
		},
		createDebtRequestEnd: (state) => {
			state.isLoading = false;
		},
	},
});

export const {
	createDebtRequestEnd,
	createDebtRequestStart,
	resetCreateDebt,
	setValueToCreateForm,
} = createDebtSlice.actions;
