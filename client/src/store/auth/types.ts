export interface IAuthState {
	user: null | {
		_id: string,
		login: string,
		firstName: string,
		lastName: string,
		token: string,
		avatar: string | null,
	},
	register: {
		firstName: string,
		lastName: string,
		login: string,
		password: string,
		confirmPassword: string,
		touched: Record<string, boolean>,
		errors: Record<string, string>,
	}
	loginIn: {
		login: string,
		password: string,
	}
}

export interface ISetAuthPayload {
	name: string,
	value: string,
}
