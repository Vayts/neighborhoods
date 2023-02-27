import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRegisterState } from '@src/store/auth/register/types';
import { totalRegisterValidate } from '@helpers/validation';

const initialState: IRegisterState = {
	data: {
		firstName: '',
		lastName: '',
		login: '',
		password: '',
		confirmPassword: '',
	},
	errors: {},
	touched: {},
	isLoading: false,
};

export const registerSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setRegister: (state, action: PayloadAction<Record<string, string>>) => {
			state.data[action.payload.name] = action.payload.value;
			state.errors = totalRegisterValidate({
				...state.data,
				[action.payload.name]: action.payload.value,
			});
			state.touched = {
				...state.touched,
				[action.payload.name]: true,
			};
		},
		registerRequest: (state) => {
			state.isLoading = true;
		},
		registerRequestSuccess: (state) => {
			state.isLoading = false;
		},
		registerRequestError: (state) => {
			state.isLoading = false;
		},
	},
});

export const { registerRequestError, registerRequestSuccess, registerRequest, setRegister } = registerSlice.actions;
