import { RootState } from '@src/store';
import { IDebt, INeighborhood } from '@src/types/neighborhood.types';

export const selectNeighborhoods = (state: RootState): INeighborhood[] => state.neighborhoods.neighborhoods;
export const selectCurrentDebts = (state: RootState): IDebt[] => state.neighborhoods.currentDebts;
export const selectCurrentNeighborhood = (state: RootState): INeighborhood => state.neighborhoods.currentNeighborhood;
