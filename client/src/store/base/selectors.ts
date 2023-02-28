import { RootState } from '@src/store';
import { IBaseState } from '@src/store/base/types';

export const selectTheme = (state: RootState): string => state.base.theme;
export const selectAppLoading = (state: RootState): boolean => state.base.isLoading;
export const selectLang = (state: RootState): string => state.base.lang;
export const selectModal = (state: RootState): IBaseState['modal'] => state.base.modal;
