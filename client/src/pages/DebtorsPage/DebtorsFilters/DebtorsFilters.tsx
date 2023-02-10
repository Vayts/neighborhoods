import React from 'react';
import { IDebtorsFilters } from '@src/pages/DebtorsPage/DebtorsFilters/types';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectCurrentNeighborhood } from '@src/store/neighborhoods/selectors';
import { selectCurrentDebtorsFilters } from '@src/store/debtors/selectors';
import { selectUser } from '@src/store/auth/selectors';
import { DebtorsFiltersWrapper } from '@src/pages/DebtorsPage/DebtorsFilters/style';
import { Title } from '@src/components/Title/Title';
import { Checkbox } from '@src/components/UI/Checkbox/Checkbox';
import { FilterBlock } from '@src/components/FiltersBlock/FilterBlock';
import {
	addDebtorToDebtorsFilter,
	addStatusToDebtorsFilter,
	addValueToDebtorsFilter,
} from '@src/store/debtors/actions';
import { DebtsFiltersIcon, DebtsFiltersValueDivider } from '@src/pages/DebtsPage/DebtsFilters/style';
import { Input } from '@src/components/UI/Input/Input';
import { useTranslation } from 'react-i18next';

export const DebtorsFilters: React.FC<IDebtorsFilters> = ({ title, isLoading }) => {
	const neighborhood = useAppSelector(selectCurrentNeighborhood);
	const filters = useAppSelector(selectCurrentDebtorsFilters);
	const user = useAppSelector(selectUser);
	const dispatch = useAppDispatch();
	const { t } = useTranslation();
	
	const statusHandler = (e) => {
		dispatch(addStatusToDebtorsFilter(filters, e.target.dataset.value));
	};
	
	const valueHandler = (e) => {
		if (Number(e.target.value) < 0) {
			return null;
		}
		dispatch(addValueToDebtorsFilter(filters, e.target.name, e.target.value));
	};
	
	const debtorHandler = (e) => {
		dispatch(addDebtorToDebtorsFilter(filters, e.target.dataset.value));
	};
	
	return (
		<DebtorsFiltersWrapper>
			{neighborhood && (
				<>
					<Title margin='0 0 20px' fz='22px' height='45px'>{title}</Title>
					<FilterBlock title={t('status')} initialOpen>
						<Checkbox
							disabled={isLoading}
							key='statusActual'
							id='statusActual'
							value='actual'
							checked={filters.status.includes('actual')}
							changeHandler={statusHandler}
							text={t('actual')}
						/>
						<Checkbox
							disabled={isLoading}
							key='statusClosed'
							id='statusClosed'
							value='closed'
							checked={filters.status.includes('closed')}
							changeHandler={statusHandler}
							text={t('repaid')}
						/>
					</FilterBlock>
					<FilterBlock title={t('debtor')} initialOpen>
						{neighborhood.users.map((item) => {
							if (user._id !== item._id) {
								return (
									<Checkbox
										disabled={isLoading}
										key={item._id}
										id={item._id}
										value={item._id}
										checked={filters.debtors.includes(item._id)}
										changeHandler={debtorHandler}
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
								id='debtMinValue'
								name='minValue'
								width='100%'
								margin='0 10px 0 0'
								type='number'
							/>
							<DebtsFiltersIcon className='icon-minus'/>
							<Input
								value={filters.maxValue}
								onChange={valueHandler}
								id='debtMinValue'
								name='maxValue'
								width='100%'
								margin='0 0 0 10px'
								type='number'
							/>
						</DebtsFiltersValueDivider>
					</FilterBlock>
				</>
			)}
		</DebtorsFiltersWrapper>
	);
};
