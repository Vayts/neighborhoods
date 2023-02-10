import { IDebtsQuery } from '../types/debt.types';
import mongoose from 'mongoose';

export function parseDebtAuthorQuery (query: IDebtsQuery) {
	if (!query.authors) {
		return [];
	}
	
	const authors = query.authors.split(',').filter((item) => item);
	if (authors.length) {
		return authors.map((item) => {
			return new mongoose.Types.ObjectId(item.trim());
		});
	}
	return [];
}

export function parseDebtDebtorsQuery (query: IDebtsQuery) {
	if (!query.debtors) {
		return [];
	}
	
	const debtors = query.debtors.split(',').filter((item) => item);
	if (debtors.length) {
		return debtors.map((item) => {
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
