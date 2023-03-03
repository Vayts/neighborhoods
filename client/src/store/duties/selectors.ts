import { RootState } from '@src/store';
import { IDuty } from '@src/types/duty.types';

export const selectDuties = (state: RootState): IDuty[] => state.duties.data.list;

export const selectDutiesLoading = (state: RootState): boolean => state.duties.isLoading;
