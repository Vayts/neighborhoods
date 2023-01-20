import React from 'react';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { useAppSelector } from '@src/hooks/hooks';
import {
	TopNeighborhoodName,
	TopNeighborInfoItem,
	TopNeighborInfoList,
	TopNeighborItem, TopNeighborName,
	TopNeighborsList,
} from '@src/pages/Main/StatActivityRow/TopNeighborsBlock/style';
import { selectDashboardStatActivity } from '@src/store/dashboard/selectors';

export const TopNeighborsBlock: React.FC = () => {
	const topNeighbors = useAppSelector(selectDashboardStatActivity).topNeighbors;
	
	return (
		<TopNeighborsList>
			{topNeighbors.map((item) => {
				return (
					<TopNeighborItem key={item.id}>
						<TopNeighborInfoList>
							<TopNeighborInfoItem>
								<AvatarFiller text={item.nickname} size={50}/>
								<TopNeighborName>{item.nickname}</TopNeighborName>
							</TopNeighborInfoItem>
							<TopNeighborInfoItem>
								<TopNeighborhoodName>
									<span className='icon-home'/>
									{item.neighborhoodName}
								</TopNeighborhoodName>
							</TopNeighborInfoItem>
							<TopNeighborInfoItem>
								{`${item.debtsValue} ₴`}
							</TopNeighborInfoItem>
							<TopNeighborInfoItem>
								{`${item.debtorValue} ₴`}
							</TopNeighborInfoItem>
						</TopNeighborInfoList>
					</TopNeighborItem>
				);
			})}
		</TopNeighborsList>
	);
};
