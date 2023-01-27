import { toast } from 'react-toastify';

export const getNotification = (msg: string, type: string): void => {
	toast[type](msg, {
		position: 'top-center',
		autoClose: 3000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	});
};
