import { IUserInNeighborhood } from '@src/types/neighborhood.types';

export function generateUserSelectList(userArr: IUserInNeighborhood[], userId: string): Record<string, string>[] {
	const result = [];
	userArr.forEach((item) => {
		if (userId !== item._id) {
			result.push({
				value: item._id,
				text: `${item.firstName} ${item.lastName}`,
			});
		}
	});
	return result;
}
