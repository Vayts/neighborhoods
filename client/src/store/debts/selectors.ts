import { RootState } from '@src/store';
import { IDebt } from '@src/types/debt.types';
import { IDebtsState } from '@src/store/debts/types';

export const selectCurrentDebts = (state: RootState): IDebt[] => state.debts.list;
export const selectCurrentDebtsFilters = (state: RootState): IDebtsState['filters'] => state.debts.filters;
