import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import Calendar from 'react-calendar';
import { selectLang } from '@src/store/base/selectors';
import './calendar.css';
import { IDutyCalendarProps } from '@src/pages/DutiesPage/DutyCard/DutyCalendar/types';
import { setModal } from '@src/store/base/reducer';
import { MODALS } from '@constants/modals';
import { format } from 'date-fns';
import { DutyMarkLabel } from '@src/pages/DutiesPage/DutyCard/DutyMark/DutyMark';
import { DutyMarkWrapper } from '@src/pages/DutiesPage/DutyCard/DutyCalendar/style';

export const DutyCalendar: React.FC<IDutyCalendarProps> = ({ marks, members, duty }) => {
	const lang = useAppSelector(selectLang);
	const [value, setValue] = useState(null);
	const dispatch = useAppDispatch();
	const change = useCallback((value) => {
		setValue(value);
	}, [value]);
	
	const openDutyMarkModal = (date) => {
		dispatch(setModal({ type: MODALS.dutyMark, content: { duty, date: date.getTime() } }));
	};
	
	const openDutyDayHistoryModal = (e, marks) => {
		e.stopPropagation();
		dispatch(setModal({ type: MODALS.dutyDayHistory, content: { members, marks } }));
	};
	
	const generateCalendarDayContent = (date, view) => {
		if (view === 'month') {
			const formatDate = format(date, 'ddMMyyyy');
			if (marks[formatDate]) {
				return (
					<DutyMarkWrapper onClick={(e) => openDutyDayHistoryModal(e, marks[formatDate])}>
						<DutyMarkLabel
							event={marks[formatDate][0]}
							members={members}
						/>
					</DutyMarkWrapper>
				);
			}
		}
	};
	
	return (
		<>
			<Calendar
				onChange={change}
				value={value}
				locale={`${lang}-${lang.toUpperCase()}`}
				maxDetail='month'
				minDetail='month'
				className='react-calendar-duty'
				onClickDay={(date) => openDutyMarkModal(date)}
				tileContent={({ date, view }) => generateCalendarDayContent(date, view)}
			/>
		</>
	);
};
