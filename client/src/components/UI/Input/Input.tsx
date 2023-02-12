import React, { useState } from 'react';
import { InputContent, InputItem, InputLabel, InputWrapper } from '@src/components/UI/Input/style';
import { IInput } from './types';

export const Input: React.FC<IInput> = (
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
		secure,
		disabled,
		type = 'text',
		refValue,
		height,
		min,
		max,
	}: IInput) => {
	const [show, setShow] = useState(false);
	
	return (
		<InputWrapper margin={margin}>
			{label ? <InputLabel htmlFor={id}>{label}</InputLabel> : null}
			<InputContent>
				<InputItem
					min={min}
					max={max}
					ref={refValue || null}
					id={id}
					name={name}
					placeholder={placeholder}
					onChange={onChange}
					value={value}
					padding={padding}
					width={width}
					height={height}
					fz={fz}
					type={show ? 'text' : type}
					disabled={disabled}
				/>
				{secure 
					? (
						<span
							className='icon-password'
							onMouseDown={() => setShow(!show)}
							onMouseUp={() => setShow(!show)}
							onTouchStart={() => setShow(!show)}
							onTouchEnd={() => setShow(!show)}
						/>
					) : null}
			</InputContent>
		</InputWrapper>
	);
};
