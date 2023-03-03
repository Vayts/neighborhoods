import { createAction } from '@reduxjs/toolkit';

export const getDutiesRequest = createAction('GET_DUTIES', (neighborhoodId) => ({ payload: { neighborhoodId } }));
