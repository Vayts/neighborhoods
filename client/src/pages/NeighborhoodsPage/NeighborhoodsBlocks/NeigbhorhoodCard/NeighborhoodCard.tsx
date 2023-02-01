import React, { useEffect, useState } from 'react';
import {
	NCardBottomContent,
	NCardContent,
	NCardDescription, NCardIcon,
	NCardTitle, NCardTitleWrapper, NCardType,
	NCardWrapper,
} from '@src/pages/NeighborhoodsPage/NeighborhoodsBlocks/NeigbhorhoodCard/style';
import { UserList } from '@src/components/UserList/UserList';
import { Button } from '@src/components/UI/Button/Button';
import { INeighborhood } from '@src/types/neighborhood.types';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface ICard extends INeighborhood{
	index: number,
}

export const NeighborhoodCard: React.FC<ICard> = ({ users, index, title, type, description, _id }) => {
	const [shown, setShown] = useState<boolean>(false);
	const { t } = useTranslation();
	const navigate = useNavigate();
	
	useEffect(() => {
		const timeout = setTimeout(() => {
			setShown(true);
		}, index * 60);
		
		return () => {
			clearTimeout(timeout);
		};
	});
	
	return (
		shown ? (
			<NCardWrapper>
				<NCardContent>
					<span className='icon-more'/>
					<NCardTitleWrapper>
						<NCardIcon className='icon-home'/>
						<NCardTitle>{title}</NCardTitle>
						<NCardType>{type}</NCardType>
					</NCardTitleWrapper>
					<NCardDescription>{description.length > 60 ? `${description.slice(0, 57)}...` : description}</NCardDescription>
					<NCardBottomContent>
						<Button onClick={() => navigate(`/neighborhood/${_id}`)} title={t('visit')} width='100px' height='30px'/>
						<UserList size={35} userArr={users}/>
					</NCardBottomContent>
				</NCardContent>
			</NCardWrapper>
		) : null
	);
};
