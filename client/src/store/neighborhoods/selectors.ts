import { RootState } from '@src/store';
import { INeighborhood } from '@src/types/neighborhood.types';

export const selectNeighborhoods = (state: RootState): INeighborhood[] => state.neighborhoods.neighborhoods;
export const selectIsNeighborhoodsLoading = (state: RootState): boolean => state.neighborhoods.isLoading;
