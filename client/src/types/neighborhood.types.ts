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
	creationDate: string | Date,
	expDate: null | string | Date,
	status: boolean,
	photo?: string | null,
	author?: IUserInNeighborhood,
	debtor?: IUserInNeighborhood,
}
