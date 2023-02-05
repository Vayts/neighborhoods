import React from 'react';
import { ICheckbox } from '@src/components/UI/Checkbox/types';
import { CheckboxIcon, CheckboxInput, CheckboxLabel, CheckboxWrapper } from '@src/components/UI/Checkbox/style';

export const Checkbox: React.FC<ICheckbox> = ({ checked, text, id, margin, changeHandler, value, disabled }) => {
	return (
		<CheckboxWrapper margin={margin} htmlFor={id}>
			<CheckboxIcon checked={checked}>
				{checked ? <span className='icon-accept'/> : null}
			</CheckboxIcon>
			<CheckboxInput id={id} onChange={(e) => changeHandler(e)} checked={checked} type='checkbox' data-value={value} disabled={disabled}/>
			<CheckboxLabel>{text}</CheckboxLabel>
		</CheckboxWrapper>
	);
};
