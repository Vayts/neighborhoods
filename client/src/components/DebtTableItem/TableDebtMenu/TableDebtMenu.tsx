import React from 'react';
import { TableDebtMenuItem, TableDebtMenuList } from '@src/components/DebtTableItem/TableDebtMenu/style';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from '@src/hooks/hooks';
import { baseSlice } from '@src/store/base/reducer';
import { MODALS } from '@constants/modals';
import { IDebt } from '@src/types/debt.types';

interface ITableDebtMenu {
	isAuthor: boolean,
	debt: IDebt,
}

export const TableDebtMenu: React.FC<ITableDebtMenu> = ({ isAuthor, debt }) => {
	const { t } = useTranslation();
	const dispatch = useAppDispatch();
	
	const openPartialPayment = () => {
		dispatch(baseSlice.actions.setModal({ type: MODALS.partialPayment, content: { debt } }));
	};
	
	const openDebtHistory = () => {
		dispatch(baseSlice.actions.setModal({ type: MODALS.debtHistory, content: { debt } }));
	};
	
	const openReduceModal = () => {
		dispatch(baseSlice.actions.setModal({ type: MODALS.reduceDebt, content: { debt } }));
	};
	
	const openIncreaseModal = () => {
		dispatch(baseSlice.actions.setModal({ type: MODALS.increaseDebt, content: { debt } }));
	};
	
	const deleteDebtModal = () => {
		dispatch(baseSlice.actions.setModal({ type: MODALS.deleteDebt, content: { debt } }));
	};
	
	return (
		<TableDebtMenuList isLoading={false}>
			{isAuthor && !debt.status
				&& (
					<>
						<TableDebtMenuItem onClick={() => openPartialPayment()}>{t('partialPaymentMenu')}</TableDebtMenuItem>
						<TableDebtMenuItem onClick={() => openReduceModal()}>{t('reduceDebtTitle')}</TableDebtMenuItem>
						<TableDebtMenuItem onClick={() => openIncreaseModal()}>{t('increaseDebtTitle')}</TableDebtMenuItem>
					</>
				)}
			<TableDebtMenuItem onClick={() => openDebtHistory()}>{t('debtHistory')}</TableDebtMenuItem>
			<TableDebtMenuItem>{t('edit')}</TableDebtMenuItem>
			{isAuthor && <TableDebtMenuItem isDelete onClick={() => deleteDebtModal()}>{t('delete')}</TableDebtMenuItem>}
		</TableDebtMenuList>
	);
};
