import { createSlice } from '@reduxjs/toolkit';
import { IDashboardState } from '@src/store/dashboard/types';

const initialState: IDashboardState = {
	debtsInfo: {
		debt: {
			counter: 12,
			value: 544,
		},
		debtor: {
			counter: 45,
			value: 4239,
		},
		total: {
			returned: 450,
			totalValue: 780,
		},
	},
	statActivity: {
		stats: [
			{
				receivedDebts: 32,
				returnedDebts: 14,
				titleKey: 'thisMonth',
				color: '#52CD9F',
			},
			{
				receivedDebts: 14,
				returnedDebts: 11,
				titleKey: 'prevMonth',
				color: '#FF9F38',
			},
			{
				receivedDebts: 655,
				returnedDebts: 111,
				titleKey: 'total',
				color: '#E391EA',
			},
		],
		activity: [
			{
				titleKey: 'yourDebts',
				color: '#FF9F38',
				subColor: '#52CD9F',
				valueArr: [
					{
						nameKey: 'jan',
						debtsActive: 1232,
						debtsRepaid: 114,
					},
					{
						nameKey: 'feb',
						debtsActive: 40,
						debtsRepaid: 1612,
					},
					{
						nameKey: 'mar',
						debtsActive: 35,
						debtsRepaid: 177,
					},
					{
						nameKey: 'apr',
						debtsActive: 65,
						debtsRepaid: 312,
					},
					{
						nameKey: 'may',
						debtsActive: 12,
						debtsRepaid: 122,
					},
				],
			},
			{
				titleKey: 'yourDebtors',
				color: '#52CD9F',
				subColor: '#FF9F38',
				valueArr: [
					{
						nameKey: 'jan',
						debtsActive: 2232,
						debtsRepaid: 1114,
					},
					{
						nameKey: 'feb',
						debtsActive: 240,
						debtsRepaid: 1612,
					},
					{
						nameKey: 'mar',
						debtsActive: 35,
						debtsRepaid: 177,
					},
					{
						nameKey: 'apr',
						debtsActive: 65,
						debtsRepaid: 312,
					},
					{
						nameKey: 'may',
						debtsActive: 12,
						debtsRepaid: 122,
					},
				],
			},
		],
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
			{
				nickname: 'Graves Doe',
				avatar: null,
				debtorValue: 2205,
				id: 'asdasfdassd',
				debtsValue: 123,
				neighborhoodName: 'Lizoopa',
			},
			{
				nickname: 'lolkking',
				avatar: null,
				debtorValue: 2205,
				id: 'asdaszcffdsd',
				debtsValue: 123,
				neighborhoodName: 'BoozaKer',
			},
		],
	},
};

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {

	},
});
