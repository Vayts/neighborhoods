import React from 'react';
import { IDebt } from '@src/types/neighborhood.types';
import { TDebt } from '@src/pages/NeighborhoodCurrentPage/DebtsTable/TDebt/TDebt';
import { DebtsTableList } from './style';

export const DebtsTable: React.FC = () => {
	const DATA: IDebt[] = [
		{
			_id: 'asdasd',
			status: false,
			title: 'Bizzzooro',
			description: 'Test description asdsadas jkansdnka asnjkdajnk nasjkdnasjk kjnasdnjkasdkjn asjkdnsajk kjnasdnasjk kjnansdnjkas nasjkdnkj asdnjkasjnk',
			creationDate: Date.now(),
			expDate: Date.now(),
			value: 34311,
			photo: null,
			author: {
				_id: 'xdadf',
				avatar: null,
				firstName: 'Jora',
				lastName: 'GigaNiga',
				login: 'Jorishe',
			},
		},
		{
			_id: 'asчasd',
			status: false,
			title: 'Bizzzooro',
			description: 'Test description',
			creationDate: Date.now(),
			expDate: Date.now(),
			photo: null,
			value: 311,
			author: {
				_id: 'xdadf',
				avatar: null,
				firstName: 'Jora',
				lastName: 'GigaNiga',
				login: 'Jorishe',
			},
		},
		{
			_id: 'asdaasd',
			status: true,
			title: 'Bizzzooro',
			description: 'Test description',
			creationDate: Date.now(),
			expDate: Date.now(),
			photo: null,
			value: 311,
			author: {
				_id: 'xdadf',
				avatar: null,
				firstName: 'Jora',
				lastName: 'GigaNiga',
				login: 'Jorishe',
			},
		},
	];
	
	return (
		<DebtsTableList>
			{DATA.map((item, index) => {
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
