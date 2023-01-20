import { RootState } from '@src/store';
import { AuthState } from '@src/store/auth/types';

export const selectRegister = (state: RootState): AuthState['register'] => state.auth.register;
