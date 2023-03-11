export interface ISelect {
	arr: Record<string, string | number>[]
	onChange: (value) => void;
	value: Record<string, string> | null;
	placeholder?: string;
	label?: string;
	margin?: string;
	disabled?: boolean;
}
