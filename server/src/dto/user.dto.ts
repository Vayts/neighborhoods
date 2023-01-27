import { UserDocument } from '../schemas/user.schema';

export class SimpleUserDto {
	
	constructor(user: UserDocument) {
		this.firstName = user.firstName;
		this.lastName = user.lastName;
		this.login = user.login;
		this._id = user._id;
		this.avatar = user.avatar || null;
	}
	_id: string;
	firstName: string;
	lastName: string;
	login: string;
	avatar: string | null;
	
}
