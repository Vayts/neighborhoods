import React from 'react';
import { NeighborhoodsBlocksList } from '@src/pages/NeighborhoodsPage/NeighborhoodsBlocks/style';
import { useAppSelector } from '@src/hooks/hooks';
import { selectNeighborhoods } from '@src/store/neighborhoods/selectors';
import { NeighborhoodCard } from '@src/pages/NeighborhoodsPage/NeighborhoodsBlocks/NeigbhorhoodCard/NeighborhoodCard';

export const NeighborhoodsBlocks: React.FC = () => {
	const neighborhoods = useAppSelector(selectNeighborhoods);
	
	return (
		<NeighborhoodsBlocksList>
			{neighborhoods.map((item, index) => {
				return (
					<NeighborhoodCard
						key={item._id}
						_id={item._id}
						title={item.title}
						description={item.description}
						type={item.type}
						users={item.users}
						index={index + 1}
					/>
				);
			})}
		</NeighborhoodsBlocksList>
	);
};
