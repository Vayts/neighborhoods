import { RootState } from '@src/store';
import { ICreateDebt } from '@src/store/createDebt/types';

export const selectDebtForm = (state: RootState): ICreateDebt['form'] => state.createDebt.form;
export const selectDebtFormNeighborhood = (state: RootState): ICreateDebt['neighborhood'] => state.createDebt.neighborhood;
export const selectDebtFormErrors = (state: RootState): ICreateDebt['errors'] => state.createDebt.errors;
export const selectDebtFormTouched = (state: RootState): ICreateDebt['touched'] => state.createDebt.touched;
