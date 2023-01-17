import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  user: null | {
    nickname: string,
    login: string,
    token: string,
  }
}

const initialState: AuthState = {
	user: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setAuth: (state, action: PayloadAction<{nickname: string, login: string, token: string}>) => {
			state.user = action.payload;
		},
	},
});
