import { IDuty } from '@src/types/duty.types';

export interface IDutiesState {
	data: {
		list: IDuty[],
	}
	isLoading: boolean,
	minorIsLoading: boolean,
}
