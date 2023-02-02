import React, { useEffect, useState } from 'react';
import { NCurrentPageWrapper } from '@src/pages/NeighborhoodCurrentPage/style';
import { Title } from '@src/components/Title/Title';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';
import { useAppDispatch } from '@src/hooks/hooks';
import { neighborhoodRequest } from '@src/store/neighborhoods/actions';
import { useParams } from 'react-router-dom';

export const NeighborhoodCurrentPage: React.FC = () => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const axiosPrivate = useAxiosPrivate();
	const dispatch = useAppDispatch();
	const { id } = useParams();
	
	useEffect(() => {
		const controller = new AbortController();
		
		dispatch(neighborhoodRequest(axiosPrivate, controller, setLoading, id));
		
		return () => {
			controller.abort();
		};
	}, []);
	
	return (
		<NCurrentPageWrapper>
			<Title>privet</Title>
		</NCurrentPageWrapper>
	);
};
