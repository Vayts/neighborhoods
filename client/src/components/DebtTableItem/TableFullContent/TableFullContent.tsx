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
	debt,
}) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	
	const openCloseModal = () => {
		dispatch(baseSlice.actions.setModal({ type: MODALS.closeDebt, content: { debt } }));
	};
	
	const generateName = () => {
		if (typeof debt.author !== 'string') {
			return `${debt.author.firstName} ${debt.author.lastName.slice(0, 1)}.`;
		}
		return `${debt.debtor.firstName} ${debt.debtor.lastName.slice(0, 1)}.`;
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
							<AvatarFiller text={debt.author?.login || debt.debtor.login}/>
						</div>
						<TableDebtControl>
							<Menu>
								<TableDebtMenu
									debt={debt}
									isAuthor={!debt.author?.login}
								/>
							</Menu>
						</TableDebtControl>
						<TableDebtSubContent>
							<TableDebtMainInfo>
								<TableDebtUserNameWrapper>
									<TableDebtUserName>{generateName()}</TableDebtUserName>
									{debt.author?.login ? null : <TableDebtorsSign>{t('debtor')}</TableDebtorsSign>}
								</TableDebtUserNameWrapper>
								<TableDebtDates>
									<DatesTimeline
										startDate={debt.creationDate}
										endDate={debt.expDate}
									/>
								</TableDebtDates>
							</TableDebtMainInfo>
							<TableDebtInfoWrapper>
								<TableDebtSmallTitle>{t('description')}</TableDebtSmallTitle>
								<TableDebtDescription>{debt.description || t('noDescription')}</TableDebtDescription>
								<TableDebtSmallTitle>{t('photo')}</TableDebtSmallTitle>
								{debt.photo ? null : <TableDebtDescription>{t('noPhoto')}</TableDebtDescription>}
								<TableDebtSmallTitle>{t('status')}</TableDebtSmallTitle>
								<TableDebtStatus status={debt.status}>{debt.status ? t('closed') : t('actual')}</TableDebtStatus>
								<TableDebtSmallTitle>{t('amountOfDebt')}</TableDebtSmallTitle>
								<TableDebtValueWrapper>
									<TableDebtValue>{`${debt.value === debt.initialValue ? debt.value : debt.initialValue} ₴`}</TableDebtValue>
									{debt.value === debt.initialValue ? null : (
										<>
											<TableDebtValueIcon className='icon-right'/>
											<TableDebtNewValue>{`${debt.value} ₴`}</TableDebtNewValue>
										</>
									)}
								</TableDebtValueWrapper>
								
								{debt.author?.login ? null
									: (
										<TableDebtBottomContent>
											<Button onClick={() => openCloseModal()} title={t('close')} margin='0' isDisabled={debt.status}/>
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
