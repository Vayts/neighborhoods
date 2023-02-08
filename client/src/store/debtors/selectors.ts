import { RootState } from '@src/store';
import { IDebt } from '@src/types/debt.types';
import { IDebtorsState } from '@src/store/debtors/types';

export const selectCurrentDebtors = (state: RootState): IDebt[] => state.debtors.list;
export const selectCurrentDebtorsFilters = (state: RootState): IDebtorsState['filters'] => state.debtors.filters;
