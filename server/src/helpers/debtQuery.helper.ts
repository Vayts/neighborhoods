import { IDebtsQuery } from '../types/debt.types';
import mongoose from 'mongoose';

export function parseDebtUsersQuery (query: IDebtsQuery) {
	if (!query.users) {
		return [];
	}
	
	const users = query.users.split(',').filter((item) => item);
	if (users.length) {
		return users.map((item) => {
			return new mongoose.Types.ObjectId(item.trim());
		});
	}
	return [];
}
export function parseDebtStatusQuery (query: IDebtsQuery) {
	if (!query.status) {
		return [];
	}
	return query.status.split(',').map((item) => {
		if (item === 'actual') {
			return false;
		}
		if (item === 'closed') {
			return true;
		}
		return null;
	})
}
