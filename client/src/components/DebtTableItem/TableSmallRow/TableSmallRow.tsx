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
	debt,
}) => {
	const { t } = useTranslation();
	
	const generateName = () => {
		if (typeof debt.author !== 'string') {
			return `${debt.author.firstName} ${debt.author.lastName.slice(0, 1)}.`;
		}
		return `${debt.debtor.firstName} ${debt.debtor.lastName.slice(0, 1)}.`;
	};
	
	return (
		<SmallRowWrapper shown={isOpen}>
			<td>
				<SmallRowOpenIcon shown={isOpen} className="icon-drop-down" onClick={() => setOpen(!isOpen)}/>
				<span>{debt.title}</span>
			</td>
			<td>
				<span>{debt.description || t('noDescription')}</span>
			</td>
			<td>
				{`${debt.value === debt.initialValue || debt.status ? debt.initialValue : debt.value} ₴`}
			</td>
			<td>
				<SmallRowUser>
					<AvatarFiller text={debt?.author?.login ? debt.author.login : debt.debtor.login} size={35} fz={14}/>
					<p>{generateName()}</p>
				</SmallRowUser>
			</td>
			<td>
				<span>{format(new Date(debt.creationDate), 'dd/MM/yyyy')}</span>
			</td>
			<td>
				<SmallRowStatusIcon status={debt.status} className={debt.status ? 'icon-check-done' : 'icon-priority'}/>
			</td>
		</SmallRowWrapper>
	);
};
