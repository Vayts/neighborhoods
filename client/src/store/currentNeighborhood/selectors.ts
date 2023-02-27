import { RootState } from '@src/store';
import { INeighborhood } from '@src/types/neighborhood.types';

export const selectCurrentNeighborhood = (state: RootState): INeighborhood => state.currentNeighborhood.neighborhood;
export const selectIsCurrentNeighborhoodLoading = (state: RootState): boolean => state.currentNeighborhood.isLoading;
