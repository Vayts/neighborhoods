import { IUserInNeighborhood } from '@src/types/neighborhood.types';

export interface IUserList {
	size?: number,
	userArr: IUserInNeighborhood[],
}

export interface IUserListItem {
	index: number,
}

export interface IUserCounter {
	size: number,
}
