import React, { useState } from 'react';
import { IFilterBlock } from '@src/components/FiltersBlock/types';
import {
	FilterBlockIcon,
	FilterBlockWrapper, FilterContent,
	FilterTitleWrapper,
} from '@src/components/FiltersBlock/style';
import { Title } from '@src/components/Title/Title';
import AnimateHeight from 'react-animate-height';

export const FilterBlock: React.FC<IFilterBlock> = ({ children, title, initialOpen = false }) => {
	const [isOpen, setOpen] = useState<boolean>(initialOpen);
	
	return (
		<FilterBlockWrapper>
			<FilterTitleWrapper>
				<Title margin='5px 0 5px' fz='16px'>{title}</Title>
				<FilterBlockIcon className={isOpen ? 'icon-minus' : 'icon-plus'} onClick={() => setOpen(!isOpen)}/>
			</FilterTitleWrapper>
			<AnimateHeight height={isOpen ? 'auto' : 0} duration={100}>
				<FilterContent>
					{children}
				</FilterContent>
			</AnimateHeight>
		</FilterBlockWrapper>
	);
};
