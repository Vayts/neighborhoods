import { RootState } from '@src/store';

export const selectTheme = (state: RootState): string => state.base.theme;
