import React from 'react';
import { IDebtsList } from '@src/pages/NeighborhoodCurrentPage/types';
import { TableDebt } from '@src/components/DebtTableItem/TableDebt/TableDebt';
import { TableHead } from '@src/components/DebtTableItem/TableHead/TableHead';
import { DebtsTableList, DebtsTableWrapper } from './style';

export const DebtsTable: React.FC<IDebtsList> = ({ debts, isLoading }) => {
	return (
		<DebtsTableWrapper>
			<DebtsTableList >
				<thead>
					<TableHead/>
				</thead>
				{
					isLoading ? null : (
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
										author={item.author}
										initialValue={item.initialValue}
										neighborhood={item.neighborhood}
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
