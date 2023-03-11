import { IUserEvent } from '@src/types/userEvent.types';
import { IUserInNeighborhood } from '@src/types/neighborhood.types';
import { IDuty } from '@src/types/duty.types';

export interface IDutyMark extends IUserEvent {
	content: {
		duty: string
		date: string,
		priority: number,
	}
}

export interface IDutyCalendarProps {
	duty: IDuty,
	marks: Record<string, IDutyMark[]>,
	members: IUserInNeighborhood[],
}
