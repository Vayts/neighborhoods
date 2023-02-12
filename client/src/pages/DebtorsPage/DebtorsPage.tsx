import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import {
	selectCurrentDebtors,
	selectCurrentDebtorsFilters,
	selectDebtorsUpdateValue,
} from '@src/store/debtors/selectors';
import {
	DebtorsContent,
	DebtorsControls,
	DebtorsPageTitleWrapper,
	DebtorsRightWrapper,
	DebtorsWrapper,
} from '@src/pages/DebtorsPage/style';
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
import { debtorsSlice } from '@src/store/debtors/reducer';
import { AddButton } from '@src/components/UI/AddButton/AddButton';
import { baseSlice } from '@src/store/base/reducer';
import { MODALS } from '@constants/modals';

export const DebtorsPage: React.FC = () => {
	const [isLoading, setLoading] = useState<boolean>(true);
	const [mode, setMode] = useState<'table' | 'blocks'>('table');
	const debtors = useAppSelector(selectCurrentDebtors);
	const dispatch = useAppDispatch();
	const filters = useAppSelector(selectCurrentDebtorsFilters);
	const axiosPrivate = useAxiosPrivate();
	const neighborhood = useAppSelector(selectCurrentNeighborhood);
	const update = useAppSelector(selectDebtorsUpdateValue);
	const { t } = useTranslation();
	const { id } = useParams();
	
	const updateHandler = () => {
		dispatch(debtorsSlice.actions.setUpdateValue());
	};
	
	const openAddDebtModal = () => {
		dispatch(baseSlice.actions.setModal({ type: MODALS.createDebt, content: { neighborhood } }));
	};
	
	useEffect(() => {
		const controller = new AbortController();
		dispatch(userDebtorsRequest(axiosPrivate, controller, setLoading, id, filters));
		
		if (!neighborhood || neighborhood._id !== id) {
			dispatch(neighborhoodRequest(axiosPrivate, controller, setLoading, id));
		}
		
		return () => {
			controller.abort();
		};
	}, [filters, update]);
	
	return (
		<DebtorsWrapper>
			<DebtorsPageTitleWrapper>
				<Title margin='5px 0' fz='20px'>{t('yourDebtors')}</Title>
				<span className='icon-refresh' onClick={() => updateHandler()}/>
			</DebtorsPageTitleWrapper>
			<DebtorsContent>
				<DebtorsRightWrapper>
					<DebtorsControls>
						<ViewMenu mode={mode} setMode={setMode}/>
						<AddButton clickHandler={() => openAddDebtModal()} size='40px'/>
					</DebtorsControls>
					{mode === 'table' && <DebtorsTable debts={debtors} isLoading={isLoading}/>}
				</DebtorsRightWrapper>
				<DebtorsFilters title={`${t('debtors')} (${debtors.length})`} isLoading={isLoading}/>
			</DebtorsContent>
		</DebtorsWrapper>
	);
};
