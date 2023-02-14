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
				{isLoading ? null
					: (
						<tbody>
							{debts.map((item, index) => {
								return (
									<TableDebt
										photo={item.photo}
										key={item._id}
										index={index}
										expDate={item.expDate}
										status={item.status}
										value={item.value}
										title={item.title}
										creationDate={item.creationDate}
										description={item.description}
										_id={item._id}
										debtor={item.debtor}
										initialValue={item.initialValue}
										neighborhood={item.neighborhood}
									/>
								);
							})}
						</tbody>
					)}
			</DebtorsTableList>
		</DebtorsTableWrapper>
	);
};
