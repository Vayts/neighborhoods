import { INeighborhood } from '@src/types/neighborhood.types';
import { IDuty } from '@src/types/duty.types';

export interface IDutyMarkModal {
	neighborhood: INeighborhood,
	duty: IDuty,
	date: Date,
}
