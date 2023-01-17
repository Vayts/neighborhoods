import React from 'react';
import { LayoutMainContent, LayoutOutletWrapper, LayoutWrapper } from '@hoc/Layout/style';
import { Outlet } from 'react-router';
import { Header } from '@src/components/Header/Header';
import { PageBar } from '@src/components/PageBar/PageBar';

export const Layout: React.FC = () => {
	return (
		<LayoutWrapper>
			<Header/>
			<LayoutMainContent>
				<PageBar/>
				<LayoutOutletWrapper>
					<Outlet/>
				</LayoutOutletWrapper>
			</LayoutMainContent>
		</LayoutWrapper>
	);
};
