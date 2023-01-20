export interface AuthState {
	user: null | {
		_id: string,
		login: string,
		token: string,
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

export interface ISetRegisterPayload {
	name: string,
	value: string,
}
