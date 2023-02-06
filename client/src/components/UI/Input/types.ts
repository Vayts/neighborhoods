import React from 'react';

export interface IInput {
	name: string,
	id: string,
	onChange: React.ChangeEventHandler,
	value: string | number,
	placeholder?: string,
	width?: string,
	margin?: string,
	padding?: string,
	fz?: string,
	label?: string,
	secure?: boolean,
	type?: string,
	disabled?: boolean,
}
