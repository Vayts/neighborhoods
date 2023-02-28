import { RootState } from '@src/store';
import { IRegisterState } from '@src/store/auth/register/types';

export const selectRegisterData = (state: RootState): IRegisterState['data'] => state.register.data;
export const selectRegisterErrors = (state: RootState): IRegisterState['errors'] => state.register.errors;
export const selectRegisterTouched = (state: RootState): IRegisterState['touched'] => state.register.touched;
export const selectRegisterIsLoading = (state: RootState): IRegisterState['isLoading'] => state.register.isLoading;
