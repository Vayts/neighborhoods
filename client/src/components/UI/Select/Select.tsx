import React, { useRef, useState } from 'react';
import { useOutsideClick } from '@src/hooks/useOutsideClick';
import { ISelect } from '@src/components/UI/Select/types';
import {
	DropdownButton,
	DropdownContent, DropdownItem, DropdownLabel, DropdownPlaceholder,
	DropdownWrapper,
} from './style';

export const Select: React.FC<ISelect> = ({ arr, onChange, placeholder, margin, disabled, value, label }) => {
	const wrapperRef = useRef(null);
	const [open, setOpen] = useState(false);
	
	const closeOnOutsideClick = () => {
		setOpen(false);
	};
	useOutsideClick(wrapperRef, closeOnOutsideClick);
	
	const openDropDown = () => {
		if (!disabled) {
			setOpen(!open);
		}
	};
	
	const clickHandler = (el) => {
		return () => {
			onChange.call(null, el);
			setOpen(null);
		};
	};
	
	return (
		<DropdownWrapper ref={wrapperRef} margin={margin} disabled={disabled}>
			{label ? <DropdownLabel>{label}</DropdownLabel> : null}
			<DropdownButton onClick={openDropDown}>
				{value?.text || <DropdownPlaceholder>{placeholder}</DropdownPlaceholder>}
				<i className={open ? 'icon-Up' : 'icon-drop-down'}/>
			</DropdownButton>
			<DropdownContent>
				{open
					? arr.map((el) => {
						if (el.value !== value?.value) {
							return (
								<DropdownItem
									key={el.value}
									onClick={clickHandler(el)}
								>
									{el.text}
								</DropdownItem>
							);
						}
						return null;
					})
					: null}
			</DropdownContent>
		</DropdownWrapper>
	);
};
