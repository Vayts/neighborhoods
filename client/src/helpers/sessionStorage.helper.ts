import { IDebtsState } from '@src/store/debts/types';
import { INeighborhood } from '@src/types/neighborhood.types';

export function getOpenedDebtsFromSessionStorage(): string[] {
	const actualOpen = sessionStorage.getItem('openDebt');
	if (!actualOpen) {
		return [];
	}
	return JSON.parse(actualOpen);
}

export function openSessionStorageHandler(debtId: string): string[] {
	const actualOpen = getOpenedDebtsFromSessionStorage();
	let newState: string[];

	if (actualOpen.includes(debtId)) {
		newState = actualOpen.filter((item) => item !== debtId);
	} else {
		newState = [...actualOpen, debtId];
	}
	sessionStorage.setItem('openDebt', JSON.stringify(newState));
	return newState;
}

export function setDebtsFiltersToSessionStorage(data: {_id: string, filters: IDebtsState['filters']}, isDebtors: boolean): boolean {
	sessionStorage.setItem(`${isDebtors ? 'debtors' : 'debts'}Filters`, JSON.stringify(data));
	return true;
}

export function removeDebtsFiltersFromSessionStorage(isDebtors: boolean): boolean {
	sessionStorage.removeItem(`${isDebtors ? 'debtors' : 'debts'}Filters`);
	return true;
}

export function getDebtsFiltersFromSessionStorage(_id: string, isDebtors: boolean): IDebtsState['filters'] | null {
	const data = sessionStorage.getItem(`${isDebtors ? 'debtors' : 'debts'}Filters`);
	
	if (data) {
		const parsed = JSON.parse(data);
		if (parsed._id === _id) {
			return parsed.filters;
		}
	}
	return null;
}

export function setNeighborhoodToSessionStorage(neighborhoodData: INeighborhood): void {
	sessionStorage.setItem('neighborhood', JSON.stringify(neighborhoodData));
}

export function getNeighborhoodFromSessionStorage(): INeighborhood | null {
	const data = sessionStorage.getItem('neighborhood');
	if (data) {
		return JSON.parse(data);
	}
	return null;
}
