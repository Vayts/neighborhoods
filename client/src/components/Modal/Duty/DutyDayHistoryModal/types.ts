import { IDutyMark } from '@src/pages/DutiesPage/DutyCard/DutyCalendar/types';
import { IUserInNeighborhood } from '@src/types/neighborhood.types';

export interface IDutyDayHistory {
	marks: IDutyMark[],
	members: IUserInNeighborhood[];
}
