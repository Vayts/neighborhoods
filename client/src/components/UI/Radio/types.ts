export interface IRadio {
	name?: string,
	text: string,
	id: string,
	value: boolean,
	checked: boolean,
	margin?: string,
	disabled?: boolean,
	changeHandler: (e) => void,
}

export interface IRadioStyle {
	margin?: string,
}

export interface IRadioCircleStyle {
	checked: boolean,
}
