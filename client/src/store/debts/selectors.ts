import { RootState } from '@src/store';
import { IDebt } from '@src/types/debt.types';
import { INeighborhoodsState } from '@src/store/neighborhoods/types';

export const selectCurrentDebts = (state: RootState): IDebt[] => state.debts.list;
export const selectCurrentDebtsFilters = (state: RootState): INeighborhoodsState['currentDebts']['filters'] => state.debts.filters;
