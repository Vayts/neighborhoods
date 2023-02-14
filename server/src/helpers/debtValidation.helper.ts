import { DEFAULT_REGEX_EXP } from '../constants/regex';

function debtTitleValidate(title: string): Record<string, string> {
	const errors: Record<string, string> = {};
	
	if (title === '') {
		errors.title = 'Error';
		return errors;
	}
	
	if (!DEFAULT_REGEX_EXP.test(title)) {
		errors.title = 'Error';
		return errors;
	}
	
	if (title.length < 2) {
		errors.title = 'Error';
		return errors;
	}
	
	if (title.length > 20) {
		errors.title = 'Error';
		return errors;
	}
	
	return errors;
}

function debtDescriptionValidate(description: string): Record<string, string> {
	const errors: Record<string, string> = {};
	
	if (description.length > 500) {
		errors.title = 'Error';
		return errors;
	}
	
	return errors;
}

function debtValueValidate(value): Record<string, string> {
	const errors: Record<string, string> = {};
	
	if (value === '') {
		errors.value = 'Error';
		return errors;
	}
	
	if (value < 1) {
		errors.value = 'Error';
		return errors;
	}
	
	if (value> 20000) {
		errors.value = 'Error';
		return errors;
	}
	
	if (isNaN(value)) {
		errors.value = 'Error';
		return errors;
	}
	
	return errors;
}

function debtDebtorValidate(debtor): Record<string, string> {
	const errors: Record<string, string> = {};
	
	if (!debtor) {
		errors.debtor = 'Error';
		return errors;
	}
	
	if (typeof debtor !== 'string') {
		errors.debtor = 'Error';
		return errors;
	}
	
	return errors;
}

function debtDateValidate(date: number) {
	const errors: Record<string, string> = {};
	const dayStart = new Date();
	dayStart.setHours(0, 0, 0, 0);
	
	if (!date) {
		return errors;
	}
	
	if (date <= dayStart.getTime()) {
		errors.expDate = 'Error';
	}
	
	return errors;
}

export function debtServerValidate(values): Record<string, string> {
	const titleCheck = debtTitleValidate(values.title);
	const valuesCheck = debtValueValidate(values.value);
	const debtorCheck = debtDebtorValidate(values.debtor);
	const dateCheck = debtDateValidate(values.expDate);
	const descriptionCheck = debtDescriptionValidate(values.description);
	
	return {
		...debtorCheck,
		...titleCheck,
		...valuesCheck,
		...dateCheck,
		...descriptionCheck,
	};
}
