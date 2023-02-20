import React, { useEffect } from 'react';
import { IDebtsFilters } from '@src/pages/DebtsPage/DebtsFilters/types';
import {
	DebtsFiltersIcon,
	DebtsFiltersValueDivider,
	DebtsFiltersWrapper,
} from '@src/pages/DebtsPage/DebtsFilters/style';
import { Title } from '@src/components/Title/Title';
import { FilterBlock } from '@src/components/FiltersBlock/FilterBlock';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectCurrentNeighborhood } from '@src/store/neighborhoods/selectors';
import { Checkbox } from '@src/components/UI/Checkbox/Checkbox';
import { selectUser } from '@src/store/auth/selectors';
import { Input } from '@src/components/UI/Input/Input';
import { selectCurrentDebtsFilters } from '@src/store/debts/selectors';
import {
	addStatusToDebtFilter,
	addUserToDebtFilter,
	addValueToDebtFilter,
} from '@src/store/debts/actions';
import { debtsSlice } from '@src/store/debts/reducer';
import { getDebtsFiltersFromSessionStorage } from '@helpers/sessionStorage.helper';
import { useLocation, useParams } from 'react-router-dom';

export const DebtsFilters: React.FC<IDebtsFilters> = ({ title, isLoading, isDebtors }) => {
	const neighborhood = useAppSelector(selectCurrentNeighborhood);
	const filters = useAppSelector(selectCurrentDebtsFilters);
	const user = useAppSelector(selectUser);
	const location = useLocation();
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	const { id } = useParams();
	
	useEffect(() => {
		const savedFilters = getDebtsFiltersFromSessionStorage(id, isDebtors);
		if (savedFilters) {
			dispatch(debtsSlice.actions.setFullFilters(savedFilters));
		}
	}, [location]);
	
	const authorHandler = (e) => {
		dispatch(addUserToDebtFilter(filters, e.target.dataset.value));
	};
	
	const statusHandler = (e) => {
		dispatch(addStatusToDebtFilter(filters, e.target.dataset.value));
	};
	
	const valueHandler = (e) => {
		if (Number(e.target.value) < 0) {
			return null;
		}
		dispatch(addValueToDebtFilter(filters, e.target.name, e.target.value));
	};
	
	return (
		<DebtsFiltersWrapper>
			{neighborhood
				? (
					<>
						<Title margin="0 0 20px" fz="22px" height="45px">{title}</Title>
						<FilterBlock title={t('status')} initialOpen>
							<Checkbox
								disabled={isLoading}
								key="statusActual"
								id="statusActual"
								value="actual"
								checked={filters.status.includes('actual')}
								changeHandler={statusHandler}
								text={t('actual')}
							/>
							<Checkbox
								disabled={isLoading}
								key="statusClosed"
								id="statusClosed"
								value="closed"
								checked={filters.status.includes('closed')}
								changeHandler={statusHandler}
								text={t('repaid')}
							/>
						</FilterBlock>
						<FilterBlock title={t('author')} initialOpen>
							{neighborhood.users.map((item) => {
								if (user._id !== item._id) {
									return (
										<Checkbox
											disabled={isLoading}
											key={item._id}
											id={item._id}
											value={item._id}
											checked={filters.users.includes(item._id)}
											changeHandler={authorHandler}
											text={`${item.firstName} ${item.lastName.slice(0, 1)}.`}
										/>
									);
								}
								return null;
							})}
						</FilterBlock>
						<FilterBlock title={t('amountOfDebt')}>
							<DebtsFiltersValueDivider>
								<Input
									value={filters.minValue}
									onChange={valueHandler}
									id="debtMinValue"
									name="minValue"
									width="100%"
									margin="0 10px 0 0"
									type="number"
								/>
								<DebtsFiltersIcon className="icon-minus"/>
								<Input
									value={filters.maxValue}
									onChange={valueHandler}
									id="debtMinValue"
									name="maxValue"
									width="100%"
									margin="0 0 0 10px"
									type="number"
								/>
							</DebtsFiltersValueDivider>
						</FilterBlock>
					</>
				) : null}
		</DebtsFiltersWrapper>
	);
};
