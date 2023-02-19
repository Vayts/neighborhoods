import React, { useCallback, useRef, useState } from 'react';
import Calendar from 'react-calendar';
import './calendar.css';
import {
	CalendarWrapper,
	DatePickerContent, DatePickerIcon,
	DatePickerInput,
	DatePickerLabel,
	DatePickerWrapper,
} from '@src/components/UI/DatePicker/style';
import { format } from 'date-fns';
import { useAppSelector } from '@src/hooks/hooks';
import { selectLang } from '@src/store/base/selectors';
import { IDatePicker } from '@src/components/UI/DatePicker/types';
import { useOutsideClick } from '@src/hooks/useOutsideClick';

export const DatePicker: React.FC<IDatePicker> = (
	{
		label,
		onChange,
		placeholder,
		margin,
		padding,
		fz,
		value,
		disabled,
		height,
		name,
		id,
		width,
		initialValue,
	},
) => {
	const lang = useAppSelector(selectLang);
	const calendarRef = useRef<HTMLDivElement>(null);
	const [isOpen, setOpen] = useState<boolean>(false);
	const [current, setCurrent] = useState(initialValue);
	
	const change = useCallback((value) => {
		onChange(value);
		setCurrent(value);
	}, [value]);
	
	useOutsideClick(calendarRef, () => setOpen(false));
	
	return (
		<DatePickerWrapper margin={margin}>
			{label ? <DatePickerLabel htmlFor={id}>{label}</DatePickerLabel> : null}
			<DatePickerContent>
				<DatePickerInput onFocus={isOpen ? null : () => setOpen(true)} height={height} name={name} placeholder={placeholder} onChange={() => null} onClick={isOpen ? null : () => setOpen(true)} fz={fz} padding={padding} width={width} id={id} value={value ? format(new Date(Number(value)), 'dd/MM/yyyy') : ''}/>
				<DatePickerIcon className='icon-calendar' onClick={isOpen ? null : () => setOpen(true)}/>
				<CalendarWrapper isOpen={isOpen} ref={calendarRef}>
					<Calendar onChange={change} value={current} locale={`${lang}-${lang.toUpperCase()}`} disabled={disabled}/>
				</CalendarWrapper>
			</DatePickerContent>
			
		</DatePickerWrapper>
	);
};
