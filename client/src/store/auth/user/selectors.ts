import { RootState } from '@src/store';
import { IUserState } from '@src/store/auth/user/types';

export const selectUser = (state: RootState): IUserState['data'] => state.user.data;
export const selectToken = (state: RootState): IUserState['data']['token'] => state.user.data.token;
export const selectIsTokenRefreshing = (state: RootState): IUserState['isTokenRefreshing'] => state.user.isTokenRefreshing;
