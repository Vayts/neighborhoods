import React from 'react';
import { IDebtContent } from '@src/types/debt.types';
import {
	TableDebtBottomContent, TableDebtNewValue, TableDebtorsSign,
	TableDebtUserNameWrapper, TableDebtValueIcon, TableDebtValueWrapper,
	TableFullRow,
} from '@src/components/DebtTableItem/TableFullContent/style';
import AnimateHeight from 'react-animate-height';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { Menu } from '@src/components/UI/Menu/Menu';
import { TableDebtMenu } from '@src/components/DebtTableItem/TableDebtMenu/TableDebtMenu';
import { DatesTimeline } from '@src/components/DatesTimeline/DatesTimeline';
import { useTranslation } from 'react-i18next';
import { Button } from '@src/components/UI/Button/Button';
import { baseSlice } from '@src/store/base/reducer';
import { useAppDispatch } from '@src/hooks/hooks';
import { MODALS } from '@constants/modals';
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
	title,
	initialValue,
	neighborhood,
}) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	
	const openCloseModal = () => {
		dispatch(baseSlice.actions.setModal({ type: MODALS.closeDebt, content: { title, value, _id } }));
	};
	
	return (
		<TableFullRow shown={isOpen}>
			<td colSpan={6}>
				<AnimateHeight
					height={isOpen ? 'auto' : 0}
					duration={200}
				>
					<TableDebtFullContent>
						<div>
							<AvatarFiller text={author?.login || debtor.login}/>
						</div>
						<TableDebtControl>
							<Menu>
								<TableDebtMenu
									value={value}
									debtId={_id}
									title={title}
									isAuthor={!author}
									neighborhoodId={neighborhood}
									status={status}
								/>
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
								<TableDebtValueWrapper>
									<TableDebtValue>{`${value === initialValue ? value : initialValue} ₴`}</TableDebtValue>
									{value === initialValue ? null : (
										<>
											<TableDebtValueIcon className='icon-right'/>
											<TableDebtNewValue>{`${value} ₴`}</TableDebtNewValue>
										</>
									)}
								</TableDebtValueWrapper>
								
								{author ? null
									: (
										<TableDebtBottomContent>
											<Button onClick={() => openCloseModal()} title={t('close')} margin='0' isDisabled={status === true}/>
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
