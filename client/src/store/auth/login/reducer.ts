import { ILoginState } from '@src/store/auth/login/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: ILoginState = {
	data: {
		login: '',
		password: '',
	},
	isLoading: false,
};

export const loginSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setLogin: (state, action: PayloadAction<Record<string, string>>) => {
			state.data[action.payload.name] = action.payload.value;
		},
		loginRequest: (state) => {
			state.isLoading = true;
		},
		loginRequestSuccess: (state) => {
			state.isLoading = false;
		},
		loginRequestError: (state) => {
			state.isLoading = false;
		},
		resetLogin: (state) => {
			state.data = initialState.data;
		},
	},
});

export const { loginRequestError, loginRequestSuccess, loginRequest, setLogin, resetLogin } = loginSlice.actions;
