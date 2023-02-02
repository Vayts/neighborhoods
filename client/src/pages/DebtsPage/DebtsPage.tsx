import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';
import { selectCurrentDebts, selectCurrentNeighborhood } from '@src/store/neighborhoods/selectors';
import { useTranslation } from 'react-i18next';
import { neighborhoodRequest, userDebtsRequest } from '@src/store/neighborhoods/actions';
import { DebtsContent, DebtsControls, DebtsWrapper } from '@src/pages/DebtsPage/style';
import { ViewMenu } from '@src/components/ViewMenu/ViewMenu';
import { Title } from '@src/components/Title/Title';
import { Loader } from '@src/components/Loader/Loader';
import { DebtsTable } from '@src/pages/DebtsPage/DebtsTable/DebtsTable';

export const DebtsPage: React.FC = () => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const [mode, setMode] = useState<'table' | 'blocks'>('table');
	const dispatch = useAppDispatch();
	const axiosPrivate = useAxiosPrivate();
	const debts = useAppSelector(selectCurrentDebts);
	const neighborhood = useAppSelector(selectCurrentNeighborhood);
	const { t } = useTranslation();
	const { id } = useParams();
	
	useEffect(() => {
		const controller = new AbortController();
		dispatch(userDebtsRequest(axiosPrivate, controller, setLoading, id));
		
		if (!neighborhood || neighborhood._id !== id) {
			dispatch(neighborhoodRequest(axiosPrivate, controller, setLoading, id));
		}
		
		return () => {
			controller.abort();
		};
	}, []);
	
	return (
		<DebtsWrapper>
			<DebtsControls>
				<ViewMenu mode={mode} setMode={setMode}/>
			</DebtsControls>
			<Title>{`${t('debts')} (${debts.length})`}</Title>
			{isLoading
				? <Loader/>
				:	(
					<DebtsContent>
						{mode === 'table' && <DebtsTable debts={debts}/>}
					</DebtsContent>
				)}
		</DebtsWrapper>
	);
};
