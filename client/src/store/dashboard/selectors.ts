import { RootState } from '@src/store';
import { IDashboardState } from '@src/store/dashboard/types';

export const selectDebtsInfo = (state: RootState): IDashboardState['debtsInfo'] => state.dashboard.debtsInfo;
export const selectDashboardStatActivity = (state: RootState): IDashboardState['statActivity'] => state.dashboard.statActivity;
