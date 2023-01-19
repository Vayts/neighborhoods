export function getPercentageNumberFromNumber(number: number, totalValue: number): number {
	return Number(((number) / totalValue * 100).toFixed(0));
}
