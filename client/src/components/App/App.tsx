import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@hoc/Layout/Layout';
import { ThemeProvider } from 'styled-components';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectModal, selectTheme } from '@src/store/base/selectors';
import { THEMES } from '@constants/colors';
import { Main } from '@src/pages/Main/Main';
import { NeighborhoodsPage } from '@src/pages/NeighborhoodsPage/NeighborhoodsPage';
import { NotificationsPage } from '@src/pages/NotificationsPage/NotificationsPage';
import { RegisterPage } from '@src/pages/RegisterPage/RegisterPage';
import { LoginPage } from '@src/pages/LoginPage/LoginPage';
import RequireAuth from '@hoc/RequireAuth/RequireAuth';
import { refreshUser } from '@src/store/auth/actions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Loader } from '@src/components/Loader/Loader';
import { NeighborhoodCurrentPage } from '@src/pages/NeighborhoodCurrentPage/NeighborhoodCurrentPage';
import { DebtsPage } from '@src/pages/DebtsPage/DebtsPage';
import { DebtorsPage } from '@src/pages/DebtorsPage/DebtorsPage';
import { Modal } from '@src/components/Modal/Modal';
import { AppWrapper } from './style';

export const App: React.FC = () => {
	const currentTheme: string = useAppSelector(selectTheme);
	const modalType = useAppSelector(selectModal).type;
	const [isLoading, setLoading] = useState(true);
	const dispatch = useAppDispatch();
	
	useEffect(() => {
		const controller = new AbortController();
		
		dispatch(refreshUser(setLoading, controller));
		
		return () => {
			controller.abort();
		};
	}, []);
	
	return (
		<ThemeProvider theme={THEMES[currentTheme]}>
			<AppWrapper>
				{isLoading 
					? <Loader size={100}/>
					: (
						<Routes>
							<Route path='/login' element={<LoginPage/>}/>
							<Route path='/register' element={<RegisterPage/>}/>
							<Route path='/' element={<RequireAuth/>}>
								<Route path='/' element={<Layout/>}>
									<Route path='/' element={<Main/>}/>
									<Route path='/dashboard' element={<Main/>}/>
									<Route path='/neighborhoods' element={<NeighborhoodsPage/>}/>
									<Route path='/notification' element={<NotificationsPage/>}/>
									<Route path='neighborhood/:id' element={<NeighborhoodCurrentPage/>}/>
									<Route path='neighborhood/debts/:id' element={<DebtsPage/>}/>
									<Route path='neighborhood/debtors/:id' element={<DebtorsPage/>}/>
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
