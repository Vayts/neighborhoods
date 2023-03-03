import React, { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import Calendar from 'react-calendar';
import { selectLang } from '@src/store/base/selectors';
import './calendar.css';
import { generateDutyMark } from '@helpers/duty.helper';
import { IDutyCalendarProps } from '@src/pages/DutiesPage/DutyCard/DutyCalendar/types';
import { DutyCalendarUserWrapper } from '@src/pages/DutiesPage/DutyCard/DutyCalendar/style';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { setModal } from '@src/store/base/reducer';
import { MODALS } from '@constants/modals';
import { selectCurrentNeighborhood } from '@src/store/currentNeighborhood/selectors';

export const DutyCalendar: React.FC<IDutyCalendarProps> = ({ marks, members, duty }) => {
	const lang = useAppSelector(selectLang);
	const [value, setValue] = useState(null);
	const dispatch = useAppDispatch();
	const neighborhood = useAppSelector(selectCurrentNeighborhood);
	const change = useCallback((value) => {
		setValue(value);
	}, [value]);
	
	const openDutyMarkModal = (date) => {
		dispatch(setModal({ type: MODALS.dutyMark, content: { duty, neighborhood, date: date.getTime() } }));
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
				tileContent={({ date, view }) => {
					if (view === 'month') {
						const author = generateDutyMark(date, marks, members);
						if (author) {
							return (
								<DutyCalendarUserWrapper title={`${author.firstName} ${author.lastName}`}>
									<AvatarFiller size={25} fz={12} text={author.login}/>
								</DutyCalendarUserWrapper>
							);
						}
					}
				}}
			/>
		</>
	);
};
