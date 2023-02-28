import React, { useEffect } from 'react';
import { NCurrentPageWrapper } from '@src/pages/NeighborhoodCurrentPage/style';
import { Title } from '@src/components/Title/Title';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { useParams } from 'react-router-dom';
import {
	selectCurrentNeighborhood,
	selectIsCurrentNeighborhoodLoading,
} from '@src/store/currentNeighborhood/selectors';
import { getNeighborhoodRequest } from '@src/store/currentNeighborhood/actions';
import { Loader } from '@src/components/Loader/Loader';

export const NeighborhoodCurrentPage: React.FC = () => {
	const isLoading = useAppSelector(selectIsCurrentNeighborhoodLoading);
	const neighborhood = useAppSelector(selectCurrentNeighborhood);
	const dispatch = useAppDispatch();
	const { id } = useParams();
	
	useEffect(() => {
		dispatch(getNeighborhoodRequest(id));
	}, []);
	
	return (
		<NCurrentPageWrapper>
			{isLoading && !neighborhood ? <Loader size={80}/> : <Title>{`privet ${neighborhood.title}`}</Title>}
		</NCurrentPageWrapper>
	);
};
