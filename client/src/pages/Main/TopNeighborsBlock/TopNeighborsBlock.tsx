import React from 'react';
import { AvatarFiller } from '@src/components/AvatarFiller/AvatarFiller';
import { useAppSelector } from '@src/hooks/hooks';
import { selectUserMain } from '@src/store/user/selectors';
import {
	TopNeighborInfoItem,
	TopNeighborInfoList,
	TopNeighborItem, TopNeighborName,
	TopNeighborsList,
} from '@src/pages/Main/TopNeighborsBlock/style';

export const TopNeighborsBlock: React.FC = () => {
	const topNeighbors = useAppSelector(selectUserMain).topNeighbors;
	
	return (
		<TopNeighborsList>
			{topNeighbors.map((item) => {
				return (
					<TopNeighborItem key={item.id}>
						<TopNeighborInfoList>
							<TopNeighborInfoItem>
								<AvatarFiller text={item.nickname} size={60}/>
								<TopNeighborName>{item.nickname}</TopNeighborName>
							</TopNeighborInfoItem>
							<TopNeighborInfoItem>
								{item.neighborhoodName}
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
