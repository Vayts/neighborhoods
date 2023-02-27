import { createAction } from '@reduxjs/toolkit';

export const getDebtHistory = createAction('GET_DEBT_HISTORY', (debtId, neighborhoodId) => ({ payload: { debtId, neighborhoodId } }));
