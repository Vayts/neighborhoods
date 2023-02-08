import React from 'react';
import { useTranslation } from 'react-i18next';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { format } from 'date-fns';
import {
	SmallRowOpenIcon,
	SmallRowStatusIcon,
	SmallRowUser,
	SmallRowWrapper,
} from '@src/components/DebtTableItem/TableSmallRow/style';
import { IDebtContent } from '@src/types/debt.types';

export const TableSmallRow: React.FC<IDebtContent> = ({
	isOpen,
	setOpen,
	title,
	description,
	value,
	author,
	debtor,
	creationDate,
	status,
}) => {
	const { t } = useTranslation();
	
	return (
		<SmallRowWrapper shown={isOpen}>
			<td>
				<SmallRowOpenIcon shown={isOpen} className="icon-drop-down" onClick={() => setOpen(!isOpen)}/>
				<span>{title}</span>
			</td>
			<td>
				<span>{description || t('noDescription')}</span>
			</td>
			<td>
				{`${value} ₴`}
			</td>
			<td>
				<SmallRowUser>
					<AvatarFiller text={author ? author.login : debtor.login} size={35} fz={14}/>
					<p>{`${author ? author.firstName : debtor.firstName} ${author ? author.lastName.slice(0, 1) : debtor.lastName.slice(0, 1)}.`}</p>
				</SmallRowUser>
			</td>
			<td>
				<span>{format(new Date(creationDate), 'dd/MM/yyyy')}</span>
			</td>
			<td>
				<SmallRowStatusIcon status={status} className={status ? 'icon-check-done' : 'icon-priority'}/>
			</td>
		</SmallRowWrapper>
	);
};
