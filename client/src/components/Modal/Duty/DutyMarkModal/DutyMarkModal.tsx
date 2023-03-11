import React, { useCallback, useEffect, useState } from 'react';
import { DutyMarkMenu, DutyMarkMenuItem, DutyMarkModalWrapper, DutyMarkTopContent } from '@src/components/Modal/Duty/DutyMarkModal/style';
import { IDutyMarkModal } from '@src/components/Modal/Duty/DutyMarkModal/types';
import { Title } from '@src/components/Title/Title';
import { useTranslation } from 'react-i18next';
import { differenceInCalendarDays, format } from 'date-fns';
import { useAppDispatch } from '@src/hooks/hooks';
import { resetModal, setModal } from '@src/store/base/reducer';
import { Description } from '@src/components/Description/Description';
import { addMarkRequest } from '@src/store/duties/actions';
import { MODALS } from '@constants/modals';

export const DutyMarkModal: React.FC<IDutyMarkModal> = ({ duty, date }) => {
	const [difference, setDifference] = useState<number>(null);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	
	useEffect(() => {
		setDifference(differenceInCalendarDays(date, Date.now()));
	}, []);
	
	const addMark = useCallback(() => {
		dispatch(addMarkRequest(duty._id, duty.neighborhood, date));
	}, [duty, date]);
	
	const addRequest = useCallback(() => {
		dispatch(setModal({ type: MODALS.dutyRequest, content: { duty, date } }));
	}, [duty]);
	
	const closeModal = () => {
		dispatch(resetModal());
	};
	
	return (
		<DutyMarkModalWrapper>
			<DutyMarkTopContent>
				<Title margin='5px auto 10px' align='center'>{duty.title}</Title>
				<Title margin='5px auto 0' fz='16px' align='center'>{format(new Date(date), 'dd/MM/yyyy')}</Title>
				{difference < -7 && <Description align='center'>{t('dutyDateWarning')}</Description>}
				{difference > 0 && <Description align='center'>{t('dutyDateFutureWarning')}</Description>}
			</DutyMarkTopContent>
			
			<DutyMarkMenu>
				<DutyMarkMenuItem onClick={() => addMark()} disabled={difference < -7 || difference > 0}>{t('markAsDone')}</DutyMarkMenuItem>
				{difference > 0 && <DutyMarkMenuItem onClick={() => addRequest()}>{t('addRequest')}</DutyMarkMenuItem>}
				<DutyMarkMenuItem onClick={() => closeModal()}>{t('close')}</DutyMarkMenuItem>
			</DutyMarkMenu>
		</DutyMarkModalWrapper>
	);
};
