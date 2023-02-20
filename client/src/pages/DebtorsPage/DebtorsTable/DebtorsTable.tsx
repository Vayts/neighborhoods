import React from 'react';
import { DebtorsTableList, DebtorsTableWrapper } from '@src/pages/DebtorsPage/DebtorsTable/style';
import { IDebtsList } from '@src/pages/NeighborhoodCurrentPage/types';
import { TableHead } from '@src/components/DebtTableItem/TableHead/TableHead';
import { TableDebt } from '@src/components/DebtTableItem/TableDebt/TableDebt';

export const DebtorsTable: React.FC<IDebtsList> = ({ debts, isLoading }) => {
	return (
		<DebtorsTableWrapper>
			<DebtorsTableList>
				<thead>
					<TableHead isDebtors/>
				</thead>
				{!isLoading && (
					<tbody>
						{debts.map((item, index) => {
							return (
								<TableDebt
									key={item._id}
									index={index}
									debt={item}
								/>
							);
						})}
					</tbody>
				)}
			</DebtorsTableList>
		</DebtorsTableWrapper>
	);
};
