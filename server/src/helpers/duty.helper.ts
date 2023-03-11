import { format } from 'date-fns';

export function generateMarksForDuties(duties) {
	return duties.map((item) => {
		const newMarks = {};
		item.marks.forEach((item) => {
			const date = format(new Date(item.content.date), 'ddMMyyyy');
			if (newMarks[date]) {
				newMarks[date] = [...newMarks[date], item]
			} else {
				newMarks[date] = [item];
			}
		})
		const newMarksKeys = Object.keys(newMarks);
		newMarksKeys.forEach((item) => {
			newMarks[item] = newMarks[item].sort((a, b) => a.content.priority - b.content.priority);
		})
		
		return {
			...item,
			marks: newMarks,
		}
	});
}
