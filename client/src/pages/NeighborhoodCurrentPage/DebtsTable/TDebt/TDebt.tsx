import React, { useEffect, useState } from 'react';
import { IDebtItem } from '@src/pages/NeighborhoodCurrentPage/types';
import {
	TDebtBottomContent,
	TDebtControls,
	TDebtDates,
	TDebtDescription,
	TDebtFullContent,
	TDebtIcon,
	TDebtInfoWrapper,
	TDebtMainInfo,
	TDebtShortContent,
	TDebtSmallDescription,
	TDebtSmallTitle, TDebtStatus,
	TDebtStatusIcon,
	TDebtSubContent,
	TDebtUserName,
	TDebtValue,
	TDebtWrapper,
} from '@src/pages/NeighborhoodCurrentPage/DebtsTable/TDebt/style';
import { useTranslation } from 'react-i18next';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import AnimateHeight from 'react-animate-height';
import { format } from 'date-fns';
import { Button } from '@src/components/UI/Button/Button';

export const TDebt: React.FC<IDebtItem> = (
	{
		_id,
		title,
		author,
		value,
		creationDate,
		expDate,
		debtor,
		status,
		description,
		index,
		photo,
	}) => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [isShown, setShown] = useState<boolean>(false);
	const { t } = useTranslation();
	
	useEffect(() => {
		const timeout = setTimeout(() => {
			setShown(true);
		}, index * 60);
		
		return () => {
			clearTimeout(timeout);
		};
	});
	
	return (
		isShown && (
			<TDebtWrapper>
				<TDebtIcon shown={isOpen} className='icon-drop-down' onClick={() => setOpen(!isOpen)}/>
				<TDebtShortContent shown={isOpen}>
					<li>{title}</li>
					<li>
						<TDebtSmallDescription>
							{description}
						</TDebtSmallDescription>
					</li>
					<li>{`${value} ₴`}</li>
					<li>
						<AvatarFiller text={author.login} size={35} fz={14}/>
						<p>{`${author.firstName} ${author.lastName.slice(0, 1)}.`}</p>
					</li>
					<li>Today</li>
					<li>
						<TDebtStatusIcon status={status} className={status ? 'icon-check-done' : 'icon-cancel-circle'}/>
					</li>
				</TDebtShortContent>
				{isOpen && (
					<TDebtControls>
						<span className='icon-edit'/>
						<span className='icon-delete'/>
					</TDebtControls>
				)}
				<AnimateHeight
					duration={200}
					height={isOpen ? 'auto' : 0}
				>
					<TDebtFullContent>
						<div>
							<AvatarFiller text={author.login || debtor.login}/>
						</div>
						<TDebtSubContent>
							<TDebtMainInfo>
								<TDebtUserName>{author ? `${author.firstName} ${author.lastName}` : `${debtor.firstName} ${debtor.lastName}`}</TDebtUserName>
								<TDebtDates>
									<div>
										<span className='icon-calendar'/>
										<p>{format(new Date(creationDate), 'MM/dd/yyyy')}</p>
									</div>
									<span className='icon-right'/>
									<div>
										<span className='icon-calendar'/>
										<p>{format(new Date(expDate), 'MM/dd/yyyy')}</p>
									</div>
								</TDebtDates>
							</TDebtMainInfo>
							<TDebtInfoWrapper>
								<TDebtSmallTitle>{t('description')}</TDebtSmallTitle>
								<TDebtDescription>{description || t('noDescription')}</TDebtDescription>
								<TDebtSmallTitle>{t('photo')}</TDebtSmallTitle>
								{photo ? null : <TDebtDescription>{t('noPhoto')}</TDebtDescription>}
								<TDebtSmallTitle>{t('status')}</TDebtSmallTitle>
								<TDebtStatus status={status}>{status ? t('closed') : t('actual')}</TDebtStatus>
								<TDebtSmallTitle>{t('amountOfDebt')}</TDebtSmallTitle>
								<TDebtValue>{`${value} ₴`}</TDebtValue>
								<TDebtBottomContent>
									<Button onClick={() => {}} title='Close' height='35px' fz='14px'/>
								</TDebtBottomContent>
							</TDebtInfoWrapper>
						</TDebtSubContent>
					</TDebtFullContent>
				</AnimateHeight>
			</TDebtWrapper>
		)
	);
};
