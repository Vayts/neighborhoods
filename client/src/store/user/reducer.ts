import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { UserState } from '@src/store/user/types';

const initialState: UserState = {
	main: {
		totalDebt: 43,
		debtsInTheAmount: 54344,
		totalDebtor: 12,
		debtorInTheAmount: 4223,
		debtsRepaid: 1200,
		totalDebtsForAllTime: 1300,
		debtsReceivedThisMonth: 6,
		debtsReceivedPrevMonth: 5,
		debtsReturnThisMonth: 1,
		debtsReturnPrevMonth: 2,
		debtsReceivedTotal: 43,
		debtsReturnTotal: 12,
		topNeighbors: [
			{
				nickname: 'Biba Bobkovich',
				avatar: null,
				debtorValue: 1205,
				id: 'asdasasd',
				debtsValue: 123,
				neighborhoodName: 'JIGALO',
			},
			{
				nickname: 'Dereck Bomboza',
				avatar: null,
				debtorValue: 1205,
				id: 'asda12sd',
				debtsValue: 123,
				neighborhoodName: 'Круте сусідство',
			},
			{
				nickname: 'Ivan G.',
				avatar: null,
				debtorValue: 2205,
				id: 'asdasfdsd',
				debtsValue: 123,
				neighborhoodName: 'JIGALO',
			},
		],
		activity: {
			userMoneyBackToHim: 1200,
			userMoneyDebt: 2300,
			debts: [
				{
					name: 'Jan',
					debtsReceived: 1232,
					debtsRepaid: 114,
				},
				{
					name: 'Feb',
					debtsReceived: 40,
					debtsRepaid: 1612,
				},
				{
					name: 'Mar',
					debtsReceived: 35,
					debtsRepaid: 177,
				},
				{
					name: 'Apr',
					debtsReceived: 65,
					debtsRepaid: 312,
				},
				{
					name: 'May',
					debtsReceived: 12,
					debtsRepaid: 122,
				},
			],
			debtor: [
				{
					name: 'Jan',
					debtsReceived: 156,
					debtsRepaid: 211,
				},
				{
					name: 'Feb',
					debtsReceived: 0,
					debtsRepaid: 212,
				},
				{
					name: 'Mar',
					debtsReceived: 200,
					debtsRepaid: 4123,
				},
				{
					name: 'Apr',
					debtsReceived: 304,
					debtsRepaid: 30,
				},
				{
					name: 'May',
					debtsReceived: 156,
					debtsRepaid: 1230,
				},
			],
		},
	},
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setMain: (state, action: PayloadAction<UserState['main']>) => {
			state.main = action.payload;
		},
	},
});
