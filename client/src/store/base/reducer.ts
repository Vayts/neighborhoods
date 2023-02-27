import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { IBaseState } from '@src/store/base/types';

const initialState: IBaseState = {
	theme: 'light',
	lang: 'uk',
	modal: {
		type: null,
		content: null,
	},
	isLoading: true,
};

export const baseSlice = createSlice({
	name: 'base',
	initialState,
	reducers: {
		loadApp: (state) => {
			state.isLoading = true;
		},
		appIsLoaded: (state) => {
			state.isLoading = false;
		},
		setTheme: (state, action: PayloadAction<string>) => {
			state.theme = action.payload;
		},
		setLang: (state, action: PayloadAction<string>) => {
			state.lang = action.payload;
		},
		setModal: (state, action: PayloadAction<IBaseState['modal']>) => {
			state.modal.type = action.payload.type;
			state.modal.content = action.payload.content || null;
		},
		resetModal: (state) => {
			state.modal = initialState.modal;
		},
	},
});

export const { loadApp, appIsLoaded, setLang, resetModal, setModal, setTheme } = baseSlice.actions;
