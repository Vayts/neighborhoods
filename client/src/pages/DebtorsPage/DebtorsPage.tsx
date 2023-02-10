import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectCurrentDebtors, selectCurrentDebtorsFilters } from '@src/store/debtors/selectors';
import { DebtorsContent, DebtorsControls, DebtorsRightWrapper, DebtorsWrapper } from '@src/pages/DebtorsPage/style';
import { ViewMenu } from '@src/components/ViewMenu/ViewMenu';
import { DebtorsFilters } from '@src/pages/DebtorsPage/DebtorsFilters/DebtorsFilters';
import { useTranslation } from 'react-i18next';
import { Title } from '@src/components/Title/Title';
import { neighborhoodRequest } from '@src/store/neighborhoods/actions';
import { useParams } from 'react-router-dom';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';
import { selectCurrentNeighborhood } from '@src/store/neighborhoods/selectors';
import { userDebtorsRequest } from '@src/store/debtors/actions';
import { DebtorsTable } from '@src/pages/DebtorsPage/DebtorsTable/DebtorsTable';

export const DebtorsPage: React.FC = () => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [mode, setMode] = useState<'table' | 'blocks'>('table');
	const debtors = useAppSelector(selectCurrentDebtors);
	const dispatch = useAppDispatch();
	const filters = useAppSelector(selectCurrentDebtorsFilters);
	const axiosPrivate = useAxiosPrivate();
	const neighborhood = useAppSelector(selectCurrentNeighborhood);
	const { t } = useTranslation();
	const { id } = useParams();
	
	useEffect(() => {
		const controller = new AbortController();
		dispatch(userDebtorsRequest(axiosPrivate, controller, setLoading, id, filters));
		
		if (!neighborhood || neighborhood._id !== id) {
			dispatch(neighborhoodRequest(axiosPrivate, controller, setLoading, id));
		}
		
		return () => {
			controller.abort();
		};
	}, [filters]);
	
	return (
		<DebtorsWrapper>
			<Title margin='5px 0' fz='20px'>{t('yourDebtors')}</Title>
			<DebtorsContent>
				<DebtorsRightWrapper>
					<DebtorsControls>
						<ViewMenu mode={mode} setMode={setMode}/>
					</DebtorsControls>
					{mode === 'table' && <DebtorsTable debts={debtors} isLoading={isLoading}/>}
				</DebtorsRightWrapper>
				<DebtorsFilters title={`${t('debtors')} (${debtors.length})`} isLoading={isLoading}/>
			</DebtorsContent>
		</DebtorsWrapper>
	);
};
