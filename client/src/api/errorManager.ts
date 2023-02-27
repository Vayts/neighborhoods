import { ERRORS } from '@constants/errors';
import { getNotification } from '@src/notification/notifications';
import i18n from 'i18next';
import { AxiosError } from 'axios';

function generateErrorMessage(error) {
	const response = error?.response?.data?.message;
	switch (response) {
	case ERRORS.WRONG_LOGIN_PASSWORD:
		return 'wrngLoginPassword';
	default:
		return 'smtWntWrng';
	}
}

export function errorManager(error: AxiosError): void {
	const errorTxt = generateErrorMessage(error);
	getNotification(i18n.t(errorTxt), 'error');
}
