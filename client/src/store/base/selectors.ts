import { RootState } from '@src/store';
import { IBaseState } from '@src/store/base/types';

export const selectTheme = (state: RootState): string => state.base.theme;

export const selectLang = (state: RootState): string => state.base.lang;
export const selectModal = (state: RootState): IBaseState['modal'] => state.base.modal;
