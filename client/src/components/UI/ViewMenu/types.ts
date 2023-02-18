import { Dispatch, SetStateAction } from 'react';

export interface IViewMenu {
	mode: 'table' | 'blocks',
	setMode: Dispatch<SetStateAction<'table' | 'blocks'>>
}

export interface IViewMenuStyle {
	isActive: boolean,
}
