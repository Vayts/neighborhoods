import React from 'react';
import {
	DatesArrow,
	DatesContentSplitter,
	DatesIcon,
	DatesText,
	DatesWrapper,
} from '@src/components/DatesTimeline/style';
import { format } from 'date-fns';
import { IDates } from '@src/components/DatesTimeline/types';

export const DatesTimeline: React.FC<IDates> = ({ startDate, endDate }) => {
	return (
		<DatesWrapper>
			<DatesContentSplitter>
				<DatesIcon className="icon-calendar" />
				<DatesText>{format(new Date(startDate), 'dd/MM/yyyy')}</DatesText>
			</DatesContentSplitter>
			<DatesContentSplitter>
				<DatesArrow className="icon-right"/>
			</DatesContentSplitter>
			<DatesContentSplitter>
				{endDate ? (
					<>
						<DatesIcon className="icon-calendar" />
						<DatesText>{format(new Date(endDate), 'dd/MM/yyyy')}</DatesText>
					</>
				) : '...'}
			</DatesContentSplitter>
		</DatesWrapper>
	);
};
