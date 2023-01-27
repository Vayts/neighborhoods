import { RootState } from '@src/store';
import { IAuthState } from '@src/store/auth/types';

export const selectRegister = (state: RootState): IAuthState['register'] => state.auth.register;
export const selectLogin = (state: RootState): IAuthState['loginIn'] => state.auth.loginIn;
export const selectUser = (state: RootState): IAuthState['user'] => state.auth.user;
