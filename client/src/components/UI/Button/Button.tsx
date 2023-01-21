import React from 'react';
import { IButton } from '@src/components/UI/Button/types';
import { ButtonItem } from '@src/components/UI/Button/style';

export const Button: React.FC<IButton> = ({
	value,
	title,
	fz,
	height,
	margin,
	padding,
	name,
	id,
	isDisabled,
	type,
	width,
	onClick,
}) => {
	return (
		<ButtonItem
			value={value}
			padding={padding}
			onClick={onClick}
			margin={margin}
			height={height}
			fz={fz}
			name={name}
			id={id}
			type={type}
			disabled={isDisabled}
			width={width}
		>
			{title}
		</ButtonItem>
	);
};
