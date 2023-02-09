import { ReactElement } from 'react';

export interface IBaseState {
	theme: string,
	lang: string,
	modal: {
		type: string,
		content: ReactElement | null,
	}
}
