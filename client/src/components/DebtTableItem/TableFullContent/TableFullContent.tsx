import React from 'react';
import { IDebtOpen } from '@src/types/debt.types';
import { TableFullRow } from '@src/components/DebtTableItem/TableFullContent/style';
import AnimateHeight from 'react-animate-height';

export const TableFullContent: React.FC<IDebtOpen> = ({ isOpen, children }) => {
	return (
		<TableFullRow shown={isOpen}>
			<td colSpan={6}>
				<AnimateHeight
					height={isOpen ? 'auto' : 0}
					duration={100}
				>
					{children}
				</AnimateHeight>
			</td>
		</TableFullRow>
	);
};
