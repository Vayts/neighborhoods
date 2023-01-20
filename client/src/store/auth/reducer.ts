import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { AuthState, ISetRegisterPayload } from '@src/store/auth/types';

const initialState: AuthState = {
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
		setAuth: (state, action: PayloadAction<{_id: string, login: string, token: string}>) => {
			state.user = action.payload;
		},
		setRegister: (state, action: PayloadAction<ISetRegisterPayload>) => {
			state.register[action.payload.name] = action.payload.value;
			state.register.touched = {
				...state.register.touched,
				[action.payload.name]: true,
			};
		},
	},
});
