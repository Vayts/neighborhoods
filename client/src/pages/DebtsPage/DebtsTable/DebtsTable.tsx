import React from 'react';
import { IDebtsList } from '@src/pages/NeighborhoodCurrentPage/types';
import { TDebt } from './TDebt/TDebt';
import { DebtsTableList } from './style';

export const DebtsTable: React.FC<IDebtsList> = ({ debts }) => {
	return (
		<DebtsTableList>
			{debts.map((item, index) => {
				return (
					<TDebt
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
					/>
				);
			})}
		</DebtsTableList>
	);
};
