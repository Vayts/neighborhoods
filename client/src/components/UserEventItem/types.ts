import { ReactElement } from 'react';

export interface IUserEventItem {
	date: string,
	leftContent: ReactElement,
	rightContent?: ReactElement | null,
	title: string,
	text: string
}
