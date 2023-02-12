import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ICreateDebt, ISetDebtValuePayload } from '@src/store/createDebt/types';
import { INeighborhood } from '@src/types/neighborhood.types';
import { debtCreateValidate } from '@helpers/debtValidation.helper';

const initialState: ICreateDebt = {
	form: {
		expDate: null,
		title: '',
		debtor: null,
		value: '',
		description: '',
	},
	neighborhood: null,
	errors: {},
	touched: {},
};

export const createDebtSlice = createSlice({
	name: 'createDebt',
	initialState,
	reducers: {
		setCreateDebt: (state, action: PayloadAction<ICreateDebt['form']>) => {
			state.form = action.payload;
		},
		setCreateDebtNeighborhood: (state, action: PayloadAction<INeighborhood>) => {
			state.neighborhood = action.payload;
		},
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
	},
});
