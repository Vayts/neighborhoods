import React from 'react';
import { IDebtContent } from '@src/pages/DebtsPage/DebtsTable/types';
import AnimateHeight from 'react-animate-height';
import {
	TableDebtControl, TableDebtDates, TableDebtDescription,
	TableDebtFullContent, TableDebtInfoWrapper, TableDebtMainInfo, TableDebtSmallTitle, TableDebtStatus,
	TableDebtSubContent, TableDebtUserName, TableDebtValue, TableFullContentRow,
} from '@src/pages/DebtsPage/DebtsTable/TableDebt/style';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { useTranslation } from 'react-i18next';
import { DatesTimeline } from '@src/components/DatesTimeline/DatesTimeline';
import { Menu } from '@src/components/UI/Menu/Menu';
import { TableDebtMenu } from '@src/pages/DebtsPage/DebtsTable/TableDebt/TableDebtMenu/TableDebtMenu';

export const TableDebtFull: React.FC<IDebtContent> = ({
	isOpen,
	author,
	creationDate,
	status,
	description,
	value,
	debtor,
	photo,
	expDate,
}) => {
	const { t } = useTranslation();
	
	return (
		<TableFullContentRow shown={isOpen}>
			<td colSpan={6}>
				<AnimateHeight
					duration={200}
					height={isOpen ? 'auto' : 0}
				>
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
				</AnimateHeight>
			</td>
		</TableFullContentRow>
	);
};
