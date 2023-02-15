import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectModal } from '@src/store/base/selectors';
import { ModalBackground, ModalClose, ModalWindow } from '@src/components/Modal/style';
import { baseSlice } from '@src/store/base/reducer';
import { useOutsideClick } from '@src/hooks/useOutsideClick';
import { CloseDebtModal } from '@src/components/Modal/СloseDebtModal/CloseDebtModal';
import { MODALS } from '@constants/modals';
import { CreateDebtModal } from '@src/components/Modal/CreateDebtModal/CreateDebtModal';
import { DebtHistoryModal } from '@src/components/Modal/DebtHistoryModal/DebtHistoryModal';
import { PartialPaymentModal } from '@src/components/Modal/PartialPaymentModal/PartialPaymentModal';

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
		document.body.style.paddingRight = 'calc(17px - (100vw - 100%))';
		
		return () => {
			document.body.style.overflowY = 'scroll';
			closeModal();
		};
	}, []);
	
	const generateModalContent = () => {
		switch (modalType) {
		case MODALS.closeDebt:
			return (
				<CloseDebtModal 
					title={modalContent.title}
					value={modalContent.value}
					_id={modalContent._id}
				/>
			);
		case MODALS.createDebt:
			return (
				<CreateDebtModal
					neighborhood={modalContent.neighborhood}
				/>
			);
		case MODALS.debtHistory:
			return (
				<DebtHistoryModal
					debt={modalContent.debt}
				/>
			);
		case MODALS.partialPayment:
			return (
				<PartialPaymentModal
					debt={modalContent.debt}
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
