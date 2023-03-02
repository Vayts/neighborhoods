import { createAction } from '@reduxjs/toolkit';

export const addUserToDebtFilter = createAction('ADD_USER_TO_DEBT_FILTER', (value) => ({ payload: { value } }));
export const addStatusToDebtFilter = createAction('ADD_STATUS_TO_DEBT_FILTER', (value) => ({ payload: { value } }));
export const closeDebtRequest = createAction('CLOSE_DEBT', (_id) => ({ payload: { _id } }));
export const reopenDebtRequest = createAction('REOPEN_DEBT', (_id) => ({ payload: { _id } }));
export const partialPaymentRequest = createAction('PARTIAL_PAYMENT', (_id, value) => ({ payload: { _id, value } }));
export const reduceDebtRequest = createAction('REDUCE_DEBT', (_id, value) => ({ payload: { _id, value } }));
export const increaseDebtRequest = createAction('INCREASE_DEBT', (_id, value) => ({ payload: { _id, value } }));
export const deleteDebtRequest = createAction('DELETE_DEBT', (_id) => ({ payload: { _id } }));
export const editDebtRequest = createAction('EDIT_DEBT', (_id, values) => ({ payload: { _id, values } }));
export const getDebtsRequest = createAction('GET_DEBTS', (_id, isDebtors) => ({ payload: { _id, isDebtors } }));
export const getDebtsFirstLoad = createAction('FIRST_DEBTS_LOAD', (_id, isDebtors) => ({ payload: { _id, isDebtors } }));
