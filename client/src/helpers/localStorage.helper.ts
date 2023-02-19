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
