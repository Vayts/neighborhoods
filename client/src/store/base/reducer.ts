import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface BaseState {
  theme: string,
	lang: string,
}

const initialState: BaseState = {
	theme: 'light',
	lang: 'ua',
};

export const baseSlice = createSlice({
	name: 'base',
	initialState,
	reducers: {
		setTheme: (state, action: PayloadAction<string>) => {
			state.theme = action.payload;
		},
		setLang: (state, action: PayloadAction<string>) => {
			state.lang = action.payload;
		},
	},
});
