import React from 'react';
import { TableDebtHeadWrapper } from '@src/pages/DebtsPage/DebtsTable/TableDebtHead/style';
import { useTranslation } from 'react-i18next';

export const TableDebtHead: React.FC = () => {
	const { t } = useTranslation();
	
	return (
		<TableDebtHeadWrapper>
			<td>{t('title')}</td>
			<td>{t('description')}</td>
			<td>{t('amountOfDebt')}</td>
			<td>{t('author')}</td>
			<td>{t('created')}</td>
			<td>{t('status')}</td>
		</TableDebtHeadWrapper>
	);
};
