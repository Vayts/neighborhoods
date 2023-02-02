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

export interface IDebt {
	_id?: string,
	title: string,
	description: string | null,
	value: number,
	creationDate: number,
	expDate: number | null,
	status: boolean,
	photo: string | null,
	author?: IUserInNeighborhood,
	debtor?: IUserInNeighborhood,
}
