import { IDutyMark } from '@src/pages/DutiesPage/DutyCard/DutyCalendar/types';
import { isSameDay, parseISO } from 'date-fns';
import { IUserInNeighborhood } from '@src/types/neighborhood.types';

export function getMarkAuthorById(members: IUserInNeighborhood[], authorId: string): IUserInNeighborhood {
	let markAuthor = null;
	members.forEach((item) => {
		if (item._id === authorId) {
			markAuthor = item;
		}
	});
	return markAuthor;
}
export function generateDutyMark(date: Date, marks: IDutyMark[], members: IUserInNeighborhood[]): IUserInNeighborhood | null {
	let markAuthor = null;
	marks.forEach((item) => {
		const dayCheck = isSameDay(date, parseISO(item.content.date));
		if (dayCheck) {
			markAuthor = getMarkAuthorById(members, item.author as string);
		}
	});
	return markAuthor;
}
