import React from 'react';
import { TextAreaContent, TextAreaItem, TextAreaLabel, TextAreaWrapper } from '@src/components/UI/TextArea/style';
import { ITextArea } from './types';

export const TextArea: React.FC<ITextArea> = (
	{
		label,
		onChange,
		placeholder,
		margin,
		padding,
		fz,
		value,
		width,
		name,
		id,
		disabled,
		height,
	}) => {
	return (
		<TextAreaWrapper margin={margin}>
			{label ? <TextAreaLabel htmlFor={id}>{label}</TextAreaLabel> : null}
			<TextAreaContent>
				<TextAreaItem
					id={id}
					name={name}
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					padding={padding}
					width={width}
					height={height}
					fz={fz}
					disabled={disabled}
				/>
			</TextAreaContent>
		</TextAreaWrapper>
	);
};
