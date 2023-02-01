import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NCurrentControls, NCurrentPageWrapper } from '@src/pages/NeighborhoodCurrentPage/style';
import { Loader } from '@src/components/Loader/Loader';
import { ViewMenu } from '@src/components/ViewMenu/ViewMenu';
import { DebtsTable } from '@src/pages/NeighborhoodCurrentPage/DebtsTable/DebtsTable';

export const NeighborhoodCurrentPage: React.FC = () => {
	const [isLoading, setLoading] = useState<boolean>(false);
	const [mode, setMode] = useState<'table' | 'blocks'>('table');
	const { id } = useParams();
	
	useEffect(() => {
		console.log(id);
	}, []);
	
	return (
		<NCurrentPageWrapper>
			<NCurrentControls>
				<ViewMenu mode={mode} setMode={setMode}/>
			</NCurrentControls>
			{isLoading 
				? <Loader/>
				:	(
					<>
						{mode === 'table' && <DebtsTable/>}
					</>
				)}
		</NCurrentPageWrapper>
	);
};
