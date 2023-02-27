import { createAction } from '@reduxjs/toolkit';

export const createDebtRequest = createAction('CREATE_DEBT_REQUEST', (values, neighborhoodId) => ({ payload: { values, neighborhoodId } }));
