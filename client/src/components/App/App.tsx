import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@hoc/Layout/Layout';
import { ThemeProvider } from 'styled-components';
import { useAppSelector } from '@src/hooks/hooks';
import { selectTheme } from '@src/store/base/selectors';
import { THEMES } from '@constants/colors';
import { Main } from '@src/pages/Main/Main';
import { NeighborhoodsPage } from '@src/pages/NeighborhoodsPage/NeighborhoodsPage';
import { NotificationsPage } from '@src/pages/NotificationsPage/NotificationsPage';
import { AppWrapper } from './style';

export const App: React.FC = () => {
	const currentTheme: string = useAppSelector(selectTheme);
	
	return (
		<ThemeProvider theme={THEMES[currentTheme]}>
			<AppWrapper>
				<Routes>
					<Route path='/' element={<Layout/>}>
						<Route path='/' element={<Main/>}/>
						<Route path='/dashboard' element={<Main/>}/>
						<Route path='/neighborhoods' element={<NeighborhoodsPage/>}/>
						<Route path='/notification' element={<NotificationsPage/>}/>
					</Route>
				</Routes>
			</AppWrapper>
		</ThemeProvider>
	);
};
