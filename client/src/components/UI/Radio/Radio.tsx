import React from 'react';
import { IRadio } from '@src/components/UI/Radio/types';
import { RadioCircle, RadioInput, RadioLabel, RadioWrapper } from '@src/components/UI/Radio/style';

export const Radio: React.FC<IRadio> = ({ name, id, value, checked, text, margin, disabled, changeHandler }) => {
	return (
		<RadioWrapper margin={margin}>
			<RadioCircle checked={checked}/>
			<RadioInput id={id} type='radio' name={name} data-value={value} checked={checked} disabled={disabled} onChange={(e) => changeHandler(e)}/>
			<RadioLabel htmlFor={id}>{text}</RadioLabel >
		</RadioWrapper>
	);
};
