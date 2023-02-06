import React from 'react';
import { TableDebtMenuItem, TableDebtMenuList } from '@src/pages/DebtsPage/DebtsTable/TableDebt/TableDebtMenu/style';
import { useTranslation } from 'react-i18next';

export const TableDebtMenu: React.FC = () => {
	const { t } = useTranslation();
	
	return (
		<TableDebtMenuList>
			<TableDebtMenuItem>{t('edit')}</TableDebtMenuItem>
			<TableDebtMenuItem>{t('delete')}</TableDebtMenuItem>
		</TableDebtMenuList>
	);
};
