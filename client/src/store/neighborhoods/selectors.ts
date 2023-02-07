import { RootState } from '@src/store';
import { INeighborhood } from '@src/types/neighborhood.types';

export const selectNeighborhoods = (state: RootState): INeighborhood[] => state.neighborhoods.neighborhoods;
export const selectCurrentNeighborhood = (state: RootState): INeighborhood => state.neighborhoods.currentNeighborhood;
