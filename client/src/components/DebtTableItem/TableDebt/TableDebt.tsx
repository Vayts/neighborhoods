import React, { useEffect, useState } from 'react';
import { TableSmallRow } from '@src/components/DebtTableItem/TableSmallRow/TableSmallRow';
import { TableFullContent } from '@src/components/DebtTableItem/TableFullContent/TableFullContent';
import { IDebtItem } from '@src/types/debt.types';
import {
	TableSplitter,
} from './style';

export const TableDebt: React.FC<IDebtItem> = (
	{
		status,
		description,
		expDate,
		value,
		title,
		author,
		creationDate,
		index,
		debtor,
	}) => {
	const [isOpen, setOpen] = useState<boolean>(false);
	const [isShown, setShown] = useState<boolean>(false);
	
	useEffect(() => {
		const timeout = setTimeout(() => {
			setShown(true);
		}, index * 60 > 1000 ? 1000 : index * 60);
		
		return () => {
			clearTimeout(timeout);
		};
	});
	
	return (
		isShown ? (
			<>
				<TableSplitter/>
				<TableSmallRow
					isOpen={isOpen}
					setOpen={setOpen}
					title={title}
					description={description}
					value={value}
					creationDate={creationDate}
					expDate={expDate}
					status={status}
					author={debtor ? null : author}
					debtor={debtor || null}
				/>
				<TableFullContent
					isOpen={isOpen}
					title={title}
					description={description}
					value={value}
					creationDate={creationDate}
					expDate={expDate}
					status={status}
					author={debtor ? null : author}
					debtor={debtor || null}
				/>
			</>
		) : null
	);
};
