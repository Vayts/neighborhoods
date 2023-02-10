import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectModal } from '@src/store/base/selectors';
import { ModalBackground, ModalClose, ModalWindow } from '@src/components/Modal/style';
import { baseSlice } from '@src/store/base/reducer';
import { useOutsideClick } from '@src/hooks/useOutsideClick';
import { CloseDebtModal } from '@src/components/Modal/СloseDebtModal/CloseDebtModal';

export const Modal: React.FC = () => {
	const modalType = useAppSelector(selectModal).type;
	const modalContent = useAppSelector(selectModal).content;
	const modalRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	
	const closeModal = () => {
		dispatch(baseSlice.actions.resetModal());
	};
	
	useEffect(() => {
		document.body.style.overflowY = 'hidden';
		
		return () => {
			document.body.style.overflowY = 'scroll';
			closeModal();
		};
	}, []);
	
	const generateModalContent = () => {
		switch (modalType) {
		case 'closeDebtModal':
			return (
				<CloseDebtModal 
					title={modalContent.title as string} 
					value={modalContent.value as number} 
					_id={modalContent._id as string}
				/>
			);
		default:
			return null;
		}
	};
	
	useOutsideClick(modalRef, closeModal);
	
	return (
		modalType && (
			<ModalBackground open={!!modalType}>
				<ModalWindow ref={modalRef}>
					<ModalClose className='icon-cancel' onClick={() => closeModal()}/>
					{generateModalContent()}
				</ModalWindow>
			</ModalBackground>
		)
	);
};
