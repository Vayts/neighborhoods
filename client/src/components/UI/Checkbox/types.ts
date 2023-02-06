export interface ICheckbox {
	name?: string,
	text: string,
	id: string,
	value: boolean | string | number,
	checked: boolean,
	margin?: string,
	disabled?: boolean,
	changeHandler: (e) => void,
}

export interface ICheckboxStyle {
	checked?: boolean;
	margin?: string,
}
