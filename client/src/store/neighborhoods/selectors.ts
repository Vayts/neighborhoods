import { RootState } from '@src/store';
import { IDebt, INeighborhood } from '@src/types/neighborhood.types';
import { INeighborhoodsState } from '@src/store/neighborhoods/types';

export const selectNeighborhoods = (state: RootState): INeighborhood[] => state.neighborhoods.neighborhoods;
export const selectCurrentDebts = (state: RootState): IDebt[] => state.neighborhoods.currentDebts.debts;
export const selectCurrentDebtsFilters = (state: RootState): INeighborhoodsState['currentDebts']['filters'] => state.neighborhoods.currentDebts.filters;
export const selectCurrentNeighborhood = (state: RootState): INeighborhood => state.neighborhoods.currentNeighborhood;
