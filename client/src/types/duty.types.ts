import { IUserInNeighborhood } from '@src/types/neighborhood.types';
import { IDutyMark } from '@src/pages/DutiesPage/DutyCard/DutyCalendar/types';

export interface IDuty {
	_id?: string,
	title: string,
	members: IUserInNeighborhood[],
	author: string,
	marks: IDutyMark[]
	active: boolean,
	neighborhood: string,
}
