import { RootState } from '@src/store';
import { IDebtHistoryItem } from '@src/types/debt.types';

export const selectDebtHistory = (state: RootState): IDebtHistoryItem[] => state.debt.debtHistory.list;
export const selectDebtHistoryLoading = (state: RootState): boolean => state.debt.debtHistory.isLoading;
