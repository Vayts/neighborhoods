import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@hoc/Layout/Layout';
import { ThemeProvider } from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectAppLoading, selectModal, selectTheme } from '@src/store/base/selectors';
import { THEMES } from '@constants/colors';
import { NeighborhoodsPage } from '@src/pages/NeighborhoodsPage/NeighborhoodsPage';
import { RegisterPage } from '@src/pages/RegisterPage/RegisterPage';
import { LoginPage } from '@src/pages/LoginPage/LoginPage';
import RequireAuth from '@hoc/RequireAuth/RequireAuth';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '@src/components/Loader/Loader';
import { NeighborhoodCurrentPage } from '@src/pages/NeighborhoodCurrentPage/NeighborhoodCurrentPage';
import { Modal } from '@src/components/Modal/Modal';
import { loadApp } from '@src/store/base/reducer';
import { DebtsPage } from '@src/pages/DebtsPage/DebtsPage';
import { NotificationsPage } from '@src/pages/NotificationsPage/NotificationsPage';
import { DutiesPage } from '@src/pages/DutiesPage/DutiesPage';
import { AppWrapper } from './style';

export const App: React.FC = () => {
	const currentTheme: string = useAppSelector(selectTheme);
	const modalType = useAppSelector(selectModal).type;
	const isLoading = useAppSelector(selectAppLoading);
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		dispatch(loadApp());
	}, []);
	
	return (
		<ThemeProvider theme={THEMES[currentTheme]}>
			<AppWrapper>
				{isLoading && <Loader/>}
				{!isLoading
					&& (
						<Routes>
							<Route path="/login" element={<LoginPage/>}/>
							<Route path="/register" element={<RegisterPage/>}/>
							<Route path='/' element={<RequireAuth/>}>
								<Route path='/' element={<Layout/>}>
									<Route path='/' element={<NeighborhoodsPage/>}/>
									<Route path='/neighborhoods' element={<NeighborhoodsPage/>}/>
									<Route path='neighborhood/:id' element={<NeighborhoodCurrentPage/>}/>
									<Route path='/notification' element={<NotificationsPage/>}/>
									<Route path='neighborhood/debts/:id' element={<DebtsPage isDebtors={false}/>}/>
									<Route path='neighborhood/debtors/:id' element={<DebtsPage isDebtors/>}/>
									<Route path='neighborhood/duties/:id' element={<DutiesPage/>}/>
								</Route>
							</Route>
						</Routes>
					)}
				<ToastContainer
					position="top-center"
					autoClose={3000}
					hideProgressBar
					newestOnTop={false}
					closeOnClick
					rtl={false}
					draggable={false}
					theme="colored"
				/>
				{modalType && <Modal/>}
			</AppWrapper>
		</ThemeProvider>
	);
};

// 	<Route path='/' element={<RequireAuth/>}>
// 		<Route path='/' element={<Layout/>}>
// 			<Route path='/' element={<Main/>}/>
// 			<Route path='/dashboard' element={<Main/>}/>
// 			<Route path='/neighborhoods' element={<NeighborhoodsPage/>}/>
// 			<Route path='/notification' element={<NotificationsPage/>}/>
// 			<Route path='neighborhood/:id' element={<NeighborhoodCurrentPage/>}/>
// 			<Route path='neighborhood/debts/:id' element={<DebtsPage isDebtors={false}/>}/>
// 			<Route path='neighborhood/debtors/:id' element={<DebtsPage isDebtors/>}/>
// 		</Route>
// 	</Route>
// </Routes>
