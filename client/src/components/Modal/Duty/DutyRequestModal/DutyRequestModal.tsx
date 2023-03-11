import React, { useCallback, useState } from 'react';
import { IDutyRequest } from '@src/components/Modal/Duty/DutyRequestModal/types';
import { DutyRequestWrapper } from '@src/components/Modal/Duty/DutyRequestModal/style';
import { Select } from '@src/components/UI/Select/Select';
import { generateUserSelectList } from '@helpers/user.helper';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectUser } from '@src/store/auth/user/selectors';
import { Button } from '@src/components/UI/Button/Button';
import { useTranslation } from 'react-i18next';
import { Title } from '@src/components/Title/Title';
import { Description } from '@src/components/Description/Description';
import { format } from 'date-fns';
import { addRequestToDuty } from '@src/store/duties/actions';

export const DutyRequestModal: React.FC<IDutyRequest> = ({ duty, date }) => {
	const user = useAppSelector(selectUser);
	const [recipient, setRecipient] = useState(null);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	
	const submitHandler = useCallback(() => {
		dispatch(addRequestToDuty(duty._id, duty.neighborhood, date, recipient));
	}, [duty, date, recipient]);
	
	return (
		<DutyRequestWrapper>
			<Title align='center'>{`${t('addRequest')} - ${duty.title}`}</Title>
			<Title margin='5px auto 0' fz='16px' align='center'>{format(new Date(date), 'dd/MM/yyyy')}</Title>
			<Description align='center'>{t('dutyRequestText')}</Description>
			<Select 
				arr={generateUserSelectList(duty.members, user._id)} 
				onChange={setRecipient}
				value={recipient}
				placeholder={t('recipient')}
				label={t('recipient')}
				margin='0 0 25px'
			/>
			<Button
				onClick={() => submitHandler()}
				title={t('addRequest')}
				margin='0 auto'
			/>
		</DutyRequestWrapper>
	);
};
