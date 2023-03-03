import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { getDutiesRequest } from '@src/store/duties/actions';
import { selectCurrentNeighborhood } from '@src/store/currentNeighborhood/selectors';
import { getNeighborhoodRequest } from '@src/store/currentNeighborhood/actions';
import { useParams } from 'react-router-dom';
import { DutiesList, DutiesTitleWrapper, DutiesWrapper } from '@src/pages/DutiesPage/style';
import { Title } from '@src/components/Title/Title';
import { useTranslation } from 'react-i18next';
import { selectDuties, selectDutiesLoading } from '@src/store/duties/selectors';
import { DutyCard } from '@src/pages/DutiesPage/DutyCard/DutyCard';
import { Loader } from '@src/components/Loader/Loader';

export const DutiesPage: React.FC = () => {
	const dispatch = useAppDispatch();
	const neighborhood = useAppSelector(selectCurrentNeighborhood);
	const duties = useAppSelector(selectDuties);
	const isLoading = useAppSelector(selectDutiesLoading);
	const { id } = useParams();
	const { t } = useTranslation();
	
	useEffect(() => {
		if (!neighborhood || neighborhood._id !== id) {
			dispatch(getNeighborhoodRequest(id));
		}
	}, [neighborhood]);
	
	useEffect(() => {
		dispatch(getDutiesRequest(neighborhood._id));
	}, []);
	
	const updateHandler = () => {
		dispatch(getDutiesRequest(neighborhood._id));
	};
	
	return (
		<DutiesWrapper>
			<DutiesTitleWrapper>
				<Title margin='5px 0' fz='20px'>{t('yourDuties')}</Title>
				<span className='icon-refresh' onClick={() => updateHandler()}/>
			</DutiesTitleWrapper>
			{isLoading ? <Loader/> : (
				<DutiesList>
					{duties.map((item) => {
						return (
							<DutyCard duty={item} key={item._id}/>
						);
					})}
				</DutiesList>
			)}
		</DutiesWrapper>
	);
};
