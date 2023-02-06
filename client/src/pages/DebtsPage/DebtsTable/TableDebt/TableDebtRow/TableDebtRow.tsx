import React from 'react';
import {
	TableDebtOpenIcon,
	TableDebtStatusIcon,
	TableDebtUser,
	TableDebtWrapper,
} from '@src/pages/DebtsPage/DebtsTable/TableDebt/style';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { format } from 'date-fns';
import { IDebtContent } from '@src/pages/DebtsPage/DebtsTable/types';
import { useTranslation } from 'react-i18next';

export const TableDebtRow: React.FC<IDebtContent> = ({ isOpen, setOpen, author, creationDate, status, description, value, title }) => {
	const { t } = useTranslation();
	
	return (
		<TableDebtWrapper shown={isOpen}>
			<td>
				<TableDebtOpenIcon shown={isOpen} className='icon-drop-down' onClick={() => setOpen(!isOpen)}/>
				<span>{title}</span>
			</td>
			<td>
				<span>{description || t('noDescription')}</span>
			</td>
			<td>
				{`${value} ₴`}
			</td>
			<td>
				<TableDebtUser>
					<AvatarFiller text={author.login} size={35} fz={14}/>
					<p>{`${author.firstName} ${author.lastName.slice(0, 1)}.`}</p>
				</TableDebtUser>
			</td>
			<td>
				<span>{format(new Date(creationDate), 'dd/MM/yyyy')}</span>
			</td>
			<td>
				<TableDebtStatusIcon status={status} className={status ? 'icon-check-done' : 'icon-priority'}/>
			</td>
		</TableDebtWrapper>
	);
};
