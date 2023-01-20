export interface IActivityItem{
	name: string,
	debtsRepaid: number,
	debtsReceived: number,
}

export interface IUserItemList {
	id?: string | number,
	
	_id: string | number,
	login: string,
	nickname: string,
	neighborhood: string,
	avatar: string | null,
}
