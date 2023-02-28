import React, { useEffect, useState } from 'react';
import { ViewMenu } from '@src/components/UI/ViewMenu/ViewMenu';
import {
	NeighborhoodsControls,
	NeighborhoodsPageWrapper,
	NeighborhoodsTitle,
} from '@src/pages/NeighborhoodsPage/style';
import { NeighborhoodsBlocks } from '@src/pages/NeighborhoodsPage/NeighborhoodsBlocks/NeighborhoodsBlocks';
import { NeighborhoodsTable } from '@src/pages/NeighborhoodsPage/NeighborhoodsTable/NeighborhoodsTable';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectIsNeighborhoodsLoading, selectNeighborhoods } from '@src/store/neighborhoods/selectors';
import { Loader } from '@src/components/Loader/Loader';
import { neighborhoodsRequest } from '@src/store/neighborhoods/reducer';

export const NeighborhoodsPage: React.FC = () => {
	const isLoading = useAppSelector(selectIsNeighborhoodsLoading);
	const [mode, setMode] = useState<'table' | 'blocks'>('blocks');
	const neighborhoods = useAppSelector(selectNeighborhoods);
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		dispatch(neighborhoodsRequest());
	}, []);
	
	return (
		<NeighborhoodsPageWrapper>
			{isLoading ? <Loader size={80}/>
				: (
					<>
						<NeighborhoodsControls>
							<ViewMenu mode={mode} setMode={setMode}/>
						</NeighborhoodsControls>
						<NeighborhoodsTitle>{`Neighborhoods ( ${neighborhoods.length}/9 )`}</NeighborhoodsTitle>
						{mode === 'table' && <NeighborhoodsTable/>}
						{mode === 'blocks' && <NeighborhoodsBlocks/>}
					</>
				)}
		</NeighborhoodsPageWrapper>
	);
};
