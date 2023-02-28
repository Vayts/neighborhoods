import { createAction } from '@reduxjs/toolkit';

export const getNeighborhoodRequest = createAction('GET_NEIGHBORHOOD', (_id) => ({ payload: { _id } }));
