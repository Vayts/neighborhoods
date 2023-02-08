import React from 'react';
import { IDebtContent } from '@src/types/debt.types';
import {
	TableDebtBottomContent, TableDebtorsSign,
	TableDebtUserNameWrapper,
	TableFullRow,
} from '@src/components/DebtTableItem/TableFullContent/style';
import AnimateHeight from 'react-animate-height';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { Menu } from '@src/components/UI/Menu/Menu';
import { TableDebtMenu } from '@src/components/DebtTableItem/TableDebtMenu/TableDebtMenu';
import { DatesTimeline } from '@src/components/DatesTimeline/DatesTimeline';
import { useTranslation } from 'react-i18next';
import { Button } from '@src/components/UI/Button/Button';
import {
	TableDebtControl, TableDebtDates, TableDebtDescription, TableDebtFullContent, TableDebtInfoWrapper,
	TableDebtMainInfo, TableDebtSmallTitle, TableDebtStatus,
	TableDebtSubContent, TableDebtUserName, TableDebtValue,
} from './style';

export const TableFullContent: React.FC<IDebtContent> = ({
	isOpen, 
	expDate, 
	creationDate, 
	status, 
	author, 
	debtor, 
	description, 
	value,
	photo, 
	_id,
}) => {
	const { t } = useTranslation();
	
	return (
		<TableFullRow shown={isOpen}>
			<td colSpan={6}>
				<AnimateHeight
					height={isOpen ? 'auto' : 0}
					duration={100}
				>
					<TableDebtFullContent>
						<div>
							<AvatarFiller text={author?.login || debtor.login}/>
						</div>
						<TableDebtControl>
							<Menu>
								<TableDebtMenu/>
							</Menu>
						</TableDebtControl>
						<TableDebtSubContent>
							<TableDebtMainInfo>
								<TableDebtUserNameWrapper>
									<TableDebtUserName>{author ? `${author.firstName} ${author.lastName}` : `${debtor.firstName} ${debtor.lastName}`}</TableDebtUserName>
									{author ? null : <TableDebtorsSign>{t('debtor')}</TableDebtorsSign>}
								</TableDebtUserNameWrapper>
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
								{author ? null
									: (
										<TableDebtBottomContent>
											<Button onClick={() => {}} title={t('close')} margin='0'/>
										</TableDebtBottomContent>
									)}
							</TableDebtInfoWrapper>
						</TableDebtSubContent>
					</TableDebtFullContent>
				</AnimateHeight>
			</td>
		</TableFullRow>
	);
};
