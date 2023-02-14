import React, { useState } from 'react';
import { TableDebtMenuItem, TableDebtMenuList } from '@src/components/DebtTableItem/TableDebtMenu/style';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { reduceDebtRequest } from '@src/store/debtors/actions';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';
import { selectCurrentDebtors } from '@src/store/debtors/selectors';
import { baseSlice } from '@src/store/base/reducer';

interface ITableDebtMenu {
	isAuthor: boolean,
	neighborhoodId: string,
	debtId: string,
	status: boolean,
}

export const TableDebtMenu: React.FC<ITableDebtMenu> = ({ isAuthor, neighborhoodId, debtId, status }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	const axiosPrivate = useAxiosPrivate();
	const debtors = useAppSelector(selectCurrentDebtors);
	const [isLoading, setLoading] = useState<boolean>(false);
	
	const reduceValue = () => {
		dispatch(reduceDebtRequest(axiosPrivate, setLoading, neighborhoodId, debtId, debtors));
	};
	
	const openDebtHistory = () => {
		dispatch(baseSlice.actions.setModal({ type: 'debtHistory', content: { debtId, neighborhoodId } }));
	};
	
	return (
		<TableDebtMenuList isLoading={isLoading}>
			{isAuthor && !status && <TableDebtMenuItem onClick={isLoading ? null : () => reduceValue()}>{t('partialPaymentMenu')}</TableDebtMenuItem>}
			<TableDebtMenuItem onClick={isLoading ? null : () => openDebtHistory()}>{t('debtHistory')}</TableDebtMenuItem>
			<TableDebtMenuItem>{t('edit')}</TableDebtMenuItem>
			<TableDebtMenuItem>{t('delete')}</TableDebtMenuItem>
		</TableDebtMenuList>
	);
};
