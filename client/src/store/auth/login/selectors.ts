import { ILoginState } from '@src/store/auth/login/types';
import { RootState } from '@src/store';

export const selectLoginData = (state: RootState): ILoginState['data'] => state.login.data;
export const selectLoginIsLoading = (state: RootState): ILoginState['isLoading'] => state.login.isLoading;
