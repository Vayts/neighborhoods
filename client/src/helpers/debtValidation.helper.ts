import { ICreateDebt } from '@src/store/createDebt/types';
import i18n from '@src/i18n';
import { DEFAULT_REGEX_EXP } from '@constants/regex';

function debtTitleValidate(title: string): Record<string, string> {
	const errors: Record<string, string> = {};
	const t = i18n.t;
	
	if (title.trim() === '') {
		errors.title = t('requiredField');
		return errors;
	}
	
	if (!DEFAULT_REGEX_EXP.test(title)) {
		errors.title = t('incorrectValue');
		return errors;
	}
	
	if (title.length < 2) {
		errors.title = t('atLeast', { value: 2 });
		return errors;
	}
	
	if (title.length > 20) {
		errors.title = t('lessThan', { value: 20 });
		return errors;
	}
	
	return errors;
}

function debtDescriptionValidate(description: string): Record<string, string> {
	const errors: Record<string, string> = {};
	const t = i18n.t;
	
	if (description.length > 500) {
		errors.title = t('lessThan', { value: 500 });
		return errors;
	}
	
	return errors;
}

function debtValueValidate(value): Record<string, string> {
	const errors: Record<string, string> = {};
	const t = i18n.t;
	
	if (value.trim() === '') {
		errors.value = t('requiredField');
		return errors;
	}
	
	if (Number(value) < 1) {
		errors.value = t('mustBeGreaterThan', { value: 1 });
		return errors;
	}
	
	if (Number(value) > 20000) {
		errors.value = t('mustBeLessThan', { value: 20000 });
		return errors;
	}
	
	return errors;
}

function debtDebtorValidate(debtor): Record<string, string> {
	const errors: Record<string, string> = {};
	const t = i18n.t;
	
	if (!debtor?.value) {
		errors.debtor = t('requiredField');
		return errors;
	}
	
	return errors;
}

function debtDateValidate(date: number) {
	const errors: Record<string, string> = {};
	const t = i18n.t;
	const dayStart = new Date();
	dayStart.setHours(0, 0, 0, 0);
	
	if (!date) {
		return errors;
	}
	
	if (date <= dayStart.getTime()) {
		errors.expDate = t('mustBeNextDay');
	}
	
	return errors;
}

export function debtCreateValidate(values: ICreateDebt['form']): Record<string, string> {
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

export function validatePartialPayment(value: string, debtValue: number): Record<string, string> {
	const errors: Record<string, string> = {};
	const t = i18n.t;
	
	if (Number.isNaN(Number(value))) {
		errors.value = t('mustBeANumber');
		return errors;
	}
	
	if (value.trim() === '') {
		errors.value = t('requiredField');
		return errors;
	}
	
	if (Number(value) < 1) {
		errors.value = t('mustBeGreaterThan', { value: 1 });
		return errors;
	}
	
	if (debtValue - Number(value) < 1) {
		errors.value = t('finalAmountCantBe', { value: 1 });
		return errors;
	}
	
	return errors;
}
