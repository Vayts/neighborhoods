import { INeighborhood } from '@src/types/neighborhood.types';

export interface IBaseState {
	theme: string,
	lang: string,
	modal: {
		type: string,
		content: Record<string, string|number> | null | Record<string, INeighborhood>,
	}
}
