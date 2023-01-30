import React, { useEffect, useState } from 'react';
import { ViewMenu } from '@src/components/ViewMenu/ViewMenu';
import {
	NeighborhoodAddButton, NeighborhoodAddIcon,
	NeighborhoodsControls,
	NeighborhoodsPageWrapper,
	NeighborhoodsTitle,
} from '@src/pages/NeighborhoodsPage/style';
import { NeighborhoodsBlocks } from '@src/pages/NeighborhoodsPage/NeighborhoodsBlocks/NeighborhoodsBlocks';
import { NeighborhoodsTable } from '@src/pages/NeighborhoodsPage/NeighborhoodsTable/NeighborhoodsTable';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectNeighborhoods } from '@src/store/neighborhoods/selectors';
import { userNeighborhoodsRequest } from '@src/store/neighborhoods/actions';
import { useAxiosPrivate } from '@src/hooks/useAxiosPrivate';
import { Loader } from '@src/components/Loader/Loader';

export const NeighborhoodsPage: React.FC = () => {
	const [isLoading, setLoading] = useState(true);
	const [mode, setMode] = useState<'table' | 'blocks'>('blocks');
	const neighborhoods = useAppSelector(selectNeighborhoods);
	const dispatch = useAppDispatch();
	const axiosPrivate = useAxiosPrivate();
	
	useEffect(() => {
		const controller = new AbortController();
		
		dispatch(userNeighborhoodsRequest(axiosPrivate, controller, setLoading));
		
		return () => {
			controller.abort();
		};
	}, []);
	
	return (
		<NeighborhoodsPageWrapper>
			{isLoading ? <Loader size={80}/>
				: (
					<>
						<NeighborhoodsControls>
							<ViewMenu mode={mode} setMode={setMode}/>
							<NeighborhoodAddButton>
								<NeighborhoodAddIcon className='icon-cancel'/>
							</NeighborhoodAddButton>
						</NeighborhoodsControls>
						<NeighborhoodsTitle>{`Neighborhoods ( ${neighborhoods.length}/9 )`}</NeighborhoodsTitle>
						{mode === 'table' && <NeighborhoodsTable/>}
						{mode === 'blocks' && <NeighborhoodsBlocks/>}
					</>
				)}
		</NeighborhoodsPageWrapper>
	);
};
