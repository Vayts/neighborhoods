import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';
import {
	selectCurrentNeighborhood,
} from '@src/store/neighborhoods/selectors';
import { useTranslation } from 'react-i18next';
import { neighborhoodRequest } from '@src/store/neighborhoods/actions';
import { DebtsContent, DebtsControls, DebtsRightWrapper, DebtsWrapper } from '@src/pages/DebtsPage/style';
import { ViewMenu } from '@src/components/ViewMenu/ViewMenu';
import { DebtsTable } from '@src/pages/DebtsPage/DebtsTable/DebtsTable';
import { DebtsFilters } from '@src/pages/DebtsPage/DebtsFilters/DebtsFilters';
import { selectCurrentDebts, selectCurrentDebtsFilters } from '@src/store/debts/selectors';
import { userDebtsRequest } from '@src/store/debts/actions';

export const DebtsPage: React.FC = () => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [mode, setMode] = useState<'table' | 'blocks'>('table');
	const dispatch = useAppDispatch();
	const axiosPrivate = useAxiosPrivate();
	const debts = useAppSelector(selectCurrentDebts);
	const neighborhood = useAppSelector(selectCurrentNeighborhood);
	const filters = useAppSelector(selectCurrentDebtsFilters);
	const { t } = useTranslation();
	const { id } = useParams();
	
	useEffect(() => {
		const controller = new AbortController();
		dispatch(userDebtsRequest(axiosPrivate, controller, setLoading, id, filters));
		
		if (!neighborhood || neighborhood._id !== id) {
			dispatch(neighborhoodRequest(axiosPrivate, controller, setLoading, id));
		}
		
		return () => {
			controller.abort();
		};
	}, [filters]);
	
	return (
		<DebtsWrapper>
			<DebtsContent>
				<DebtsRightWrapper>
					<DebtsControls>
						<ViewMenu mode={mode} setMode={setMode}/>
					</DebtsControls>
					{mode === 'table' && <DebtsTable debts={debts} isLoading={isLoading}/>}
				</DebtsRightWrapper>
				<DebtsFilters title={`${t('debts')} (${debts.length})`} isLoading={isLoading}/>
			</DebtsContent>
		</DebtsWrapper>
	);
};
