export interface INeighborhood {
	_id?: string,
	title: string,
	description: string,
	type: string,
	users: IUserInNeighborhood[],
}

export interface IUserInNeighborhood {
	_id: string,
	firstName: string,
	lastName: string,
	avatar: string,
	login: string,
}
