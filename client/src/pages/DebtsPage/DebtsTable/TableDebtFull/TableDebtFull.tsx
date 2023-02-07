import React from 'react';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { Menu } from '@src/components/UI/Menu/Menu';
import { TableDebtMenu } from '@src/pages/DebtsPage/DebtsTable/TableDebtMenu/TableDebtMenu';
import { DatesTimeline } from '@src/components/DatesTimeline/DatesTimeline';
import { IDebt } from '@src/types/debt.types';
import { useTranslation } from 'react-i18next';
import {
	TableDebtControl, TableDebtDates, TableDebtDescription, TableDebtFullContent, TableDebtInfoWrapper,
	TableDebtMainInfo, TableDebtSmallTitle, TableDebtStatus,
	TableDebtSubContent, TableDebtUserName, TableDebtValue,
} from './style';

export const TableDebtFull: React.FC<IDebt> = ({ author, debtor, status, description, value, creationDate, photo, expDate }) => {
	const { t } = useTranslation();
	
	return (
		<TableDebtFullContent>
			<div>
				<AvatarFiller text={author.login || debtor.login}/>
			</div>
			<TableDebtControl>
				<Menu>
					<TableDebtMenu/>
				</Menu>
			</TableDebtControl>
			<TableDebtSubContent>
				<TableDebtMainInfo>
					<TableDebtUserName>{author ? `${author.firstName} ${author.lastName}` : `${debtor.firstName} ${debtor.lastName}`}</TableDebtUserName>
					<TableDebtDates>
						<DatesTimeline
							startDate={creationDate}
							endDate={expDate}
						/>
					</TableDebtDates>
				</TableDebtMainInfo>
				<TableDebtInfoWrapper>
					<TableDebtSmallTitle>{t('description')}</TableDebtSmallTitle>
					<TableDebtDescription>{description || t('noDescription')}</TableDebtDescription>
					<TableDebtSmallTitle>{t('photo')}</TableDebtSmallTitle>
					{photo ? null : <TableDebtDescription>{t('noPhoto')}</TableDebtDescription>}
					<TableDebtSmallTitle>{t('status')}</TableDebtSmallTitle>
					<TableDebtStatus status={status}>{status ? t('closed') : t('actual')}</TableDebtStatus>
					<TableDebtSmallTitle>{t('amountOfDebt')}</TableDebtSmallTitle>
					<TableDebtValue>{`${value} ₴`}</TableDebtValue>
				</TableDebtInfoWrapper>
			</TableDebtSubContent>
		</TableDebtFullContent>
	);
};
