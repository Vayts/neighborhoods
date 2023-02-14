import React from 'react';

export interface IDatePicker {
	name: string,
	id: string,
	onChange: React.ChangeEventHandler,
	value: Date | number,
	placeholder?: string,
	width?: string,
	height?: string,
	margin?: string,
	padding?: string,
	fz?: string,
	label?: string,
	disabled?: boolean,
}
