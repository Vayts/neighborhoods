import React, { Ref } from 'react';

export interface IInput {
	refValue?: Ref<HTMLInputElement> | null,
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
	secure?: boolean,
	type?: string,
	disabled?: boolean,
	
	min?: number,
	max?: number,
}
