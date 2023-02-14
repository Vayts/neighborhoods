import { IUserInNeighborhood } from '@src/types/neighborhood.types';

export interface IUserEvent {
	
	_id: string,
	type: string;
	author: IUserInNeighborhood;
	recipient: IUserInNeighborhood;
	neighborhood: string;
	content: Record<string, string|boolean|number|null>;
	hasSeen: boolean;
	timeStamp: number | Date;
}
