import { RootState } from '@src/store';
import { UserState } from '@src/store/user/types';

export const selectUserMain = (state: RootState): UserState['main'] => state.user.main;
