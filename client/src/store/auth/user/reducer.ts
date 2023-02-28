import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserState } from '@src/store/auth/user/types';

const initialState: IUserState = {
	data: null,
	isTokenRefreshing: true,
};

export const userSlice = createSlice({
	name: 'login',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<IUserState['data']>) => {
			state.data = action.payload;
		},
		refreshRequest: (state) => {
			state.isTokenRefreshing = true;
		},
		refreshRequestError: (state) => {
			state.isTokenRefreshing = false;
			state.data = null;
		},
		refreshRequestSuccess: (state) => {
			state.isTokenRefreshing = false;
		},
	},
});

export const { refreshRequestError, refreshRequest, setUser, refreshRequestSuccess } = userSlice.actions;
