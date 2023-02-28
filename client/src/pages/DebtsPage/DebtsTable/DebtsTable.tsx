import React from 'react';
import { IDebtsList } from '@src/pages/NeighborhoodCurrentPage/types';
import { TableDebt } from '@src/components/DebtTableItem/TableDebt/TableDebt';
import { TableHead } from '@src/components/DebtTableItem/TableHead/TableHead';
import { DebtsTableList, DebtsTableWrapper } from './style';

export const DebtsTable: React.FC<IDebtsList> = ({ debts, isLoading, isDebtors }) => {
	return (
		<DebtsTableWrapper>
			<DebtsTableList >
				<thead>
					<TableHead isDebtors={isDebtors}/>
				</thead>
				{
					isLoading ? null : (
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
					)
				}
			</DebtsTableList>
		</DebtsTableWrapper>
	);
};
