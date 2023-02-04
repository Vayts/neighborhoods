import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IAuthState, ISetAuthPayload } from '@src/store/auth/types';
import { totalRegisterValidate } from '@helpers/validation';

const initialState: IAuthState = {
	user: null,
	register: {
		firstName: '',
		lastName: '',
		login: '',
		password: '',
		confirmPassword: '',
		touched: {
		
		},
		errors: {
		
		},
	},
	loginIn: {
		login: '',
		password: '',
	},
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<IAuthState['user']>) => {
			state.user = action.payload;
		},
		setRegister: (state, action: PayloadAction<ISetAuthPayload>) => {
			state.register[action.payload.name] = action.payload.value;
			state.register.errors = totalRegisterValidate({
				...state.register,
				[action.payload.name]: action.payload.value,
			});
			state.register.touched = {
				...state.register.touched,
				[action.payload.name]: true,
			};
		},
		setLogin: (state, action: PayloadAction<ISetAuthPayload>) => {
			state.loginIn[action.payload.name] = action.payload.value;
		},
		resetRegister: (state) => {
			state.register = initialState.register;
		},
		resetLogin: (state) => {
			state.register = initialState.register;
		},
	},
});
