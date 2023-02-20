import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';
import {
	selectCurrentNeighborhood,
} from '@src/store/neighborhoods/selectors';
import { useTranslation } from 'react-i18next';
import { neighborhoodRequest } from '@src/store/neighborhoods/actions';
import {
	DebtPageTitleWrapper,
	DebtsContent,
	DebtsControls,
	DebtsRightWrapper,
	DebtsWrapper,
} from '@src/pages/DebtsPage/style';
import { ViewMenu } from '@src/components/UI/ViewMenu/ViewMenu';
import { DebtsTable } from '@src/pages/DebtsPage/DebtsTable/DebtsTable';
import { DebtsFilters } from '@src/pages/DebtsPage/DebtsFilters/DebtsFilters';
import {
	selectCurrentDebts,
	selectCurrentDebtsFilters,
	selectDebtUpdateValue,
} from '@src/store/debts/selectors';
import { userDebtsRequest } from '@src/store/debts/actions';
import { Title } from '@src/components/Title/Title';
import { debtsSlice } from '@src/store/debts/reducer';
import {
	removeDebtsFiltersFromSessionStorage,
	setDebtsFiltersToSessionStorage,
} from '@helpers/sessionStorage.helper';
import { IDebtPage } from '@src/types/debt.types';
import { AddButton } from '@src/components/UI/AddButton/AddButton';
import { baseSlice } from '@src/store/base/reducer';
import { MODALS } from '@constants/modals';

export const DebtsPage: React.FC<IDebtPage> = ({ isDebtors }) => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [mode, setMode] = useState<'table' | 'blocks'>('table');
	const dispatch = useAppDispatch();
	const axiosPrivate = useAxiosPrivate();
	const debts = useAppSelector(selectCurrentDebts);
	const neighborhood = useAppSelector(selectCurrentNeighborhood);
	const filters = useAppSelector(selectCurrentDebtsFilters);
	const update = useAppSelector(selectDebtUpdateValue);
	const { t } = useTranslation();
	const { id } = useParams();
	const location = useLocation();
	
	const updateHandler = () => {
		dispatch(debtsSlice.actions.setUpdateValue());
	};
	
	const openCreateDebtModal = () => {
		dispatch(baseSlice.actions.setModal({ type: MODALS.createDebt, content: { neighborhood } }));
	};
	
	useEffect(() => {
		setDebtsFiltersToSessionStorage({
			_id: id,
			filters,
		}, isDebtors);
	}, [filters]);
	
	useEffect(() => {
		const controller = new AbortController();
		dispatch(userDebtsRequest(axiosPrivate, controller, setLoading, id, filters, isDebtors));
		
		return () => {
			controller.abort();
		};
	}, [filters, update, location]);
	
	useEffect(() => {
		const controller = new AbortController();

		if (!neighborhood || neighborhood._id !== id) {
			dispatch(userDebtsRequest(axiosPrivate, controller, setLoading, id, filters, isDebtors));
			dispatch(neighborhoodRequest(axiosPrivate, controller, setLoading, id));
			removeDebtsFiltersFromSessionStorage(isDebtors);
		}

		return () => {
			controller.abort();
		};
	}, [neighborhood]);
	
	return (
		<DebtsWrapper>
			<DebtPageTitleWrapper>
				<Title margin='5px 0' fz='20px'>{isDebtors ? t('yourDebtors') : t('yourDebts')}</Title>
				<span className='icon-refresh' onClick={() => updateHandler()}/>
			</DebtPageTitleWrapper>
			
			<DebtsContent>
				<DebtsRightWrapper>
					<DebtsControls>
						<ViewMenu mode={mode} setMode={setMode}/>
						{isDebtors && <AddButton clickHandler={() => openCreateDebtModal()}/>}
					</DebtsControls>
					{mode === 'table' && <DebtsTable debts={debts} isLoading={isLoading} isDebtors={isDebtors}/>}
				</DebtsRightWrapper>
				<DebtsFilters
					title={`${isDebtors ? t('debtors') : t('debts')} (${debts.length})`}
					isLoading={isLoading}
					isDebtors={isDebtors}
				/>
			</DebtsContent>
		</DebtsWrapper>
	);
};
