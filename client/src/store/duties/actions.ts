import { createAction } from '@reduxjs/toolkit';

export const getDutiesRequest = createAction('GET_DUTIES', (neighborhoodId) => ({ payload: { neighborhoodId } }));
export const addMarkRequest = createAction('ADD_MARK', (dutyId, neighborhoodId, date) => ({ payload: { dutyId, neighborhoodId, date } }));
export const addRequestToDuty = createAction('ADD_REQUEST_TO_DUTY', (dutyId, neighborhoodId, date, recipient) => ({ payload: { dutyId, neighborhoodId, date, recipient } }));
