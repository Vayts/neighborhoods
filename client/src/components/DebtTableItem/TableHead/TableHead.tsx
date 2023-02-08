import React from 'react';
import { TableHeadWrapper } from '@src/components/DebtTableItem/TableHead/style';
import { useTranslation } from 'react-i18next';

interface ITableHead {
	isDebtors?: boolean,
}

export const TableHead: React.FC<ITableHead> = ({ isDebtors }) => {
	const { t } = useTranslation();
	
	return (
		<TableHeadWrapper>
			<td>{t('title')}</td>
			<td>{t('description')}</td>
			<td>{t('amountOfDebt')}</td>
			<td>{t(isDebtors ? 'debtor' : 'author')}</td>
			<td>{t('created')}</td>
			<td>{t('status')}</td>
		</TableHeadWrapper>
	);
};
