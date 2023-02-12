import React from 'react';

export interface ITextArea {
	name: string,
	id: string,
	onChange: React.ChangeEventHandler,
	value: string | number,
	placeholder?: string,
	width?: string,
	height?: string,
	margin?: string,
	padding?: string,
	fz?: string,
	label?: string,
	disabled?: boolean,
}
