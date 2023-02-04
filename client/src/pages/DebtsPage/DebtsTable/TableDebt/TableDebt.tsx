import React, { useEffect, useState } from 'react';
import { TableDebtRow } from '@src/pages/DebtsPage/DebtsTable/TableDebt/TableDebtRow/TableDebtRow';
import { IDebtItem } from '@src/pages/DebtsPage/DebtsTable/types';
import { TableDebtFull } from '@src/pages/DebtsPage/DebtsTable/TableDebt/TableDebtFull/TableDebtFull';
import {
	TableSplitter,
} from './style';

export const TableDebt: React.FC<IDebtItem> = (
	{
		status,
		description,
		debtor,
		expDate,
		value,
		title,
		author,
		creationDate,
		photo,
		index,
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
				<TableDebtRow
					isOpen={isOpen}
					setOpen={setOpen}
					title={title}
					description={description}
					value={value}
					creationDate={creationDate}
					expDate={expDate}
					status={status}
					author={author}
				/>
				<TableDebtFull
					isOpen={isOpen}
					setOpen={setOpen}
					title={title}
					description={description}
					value={value}
					creationDate={creationDate}
					expDate={expDate}
					status={status}
					author={author}
					debtor={debtor}
					photo={photo}
				/>
			</>
		) : null
	);
};
