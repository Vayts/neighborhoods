import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@src/hooks/hooks';
import { selectModal } from '@src/store/base/selectors';
import { ModalBackground, ModalClose, ModalWindow } from '@src/components/Modal/style';
import { baseSlice } from '@src/store/base/reducer';
import { useOutsideClick } from '@src/hooks/useOutsideClick';
import { CloseDebtModal } from '@src/components/Modal/Debt/СloseDebtModal/CloseDebtModal';
import { MODALS } from '@constants/modals';
import { CreateDebtModal } from '@src/components/Modal/Debt/CreateDebtModal/CreateDebtModal';
import { DebtHistoryModal } from '@src/components/Modal/Debt/DebtHistoryModal/DebtHistoryModal';
import { PartialPaymentModal } from '@src/components/Modal/Debt/PartialPaymentModal/PartialPaymentModal';
import { ReduceDebtModal } from '@src/components/Modal/Debt/ReduceDebtModal/ReduceDebtModal';
import { IncreaseDebtModal } from '@src/components/Modal/Debt/IncreaseDebtModal/IncreaseDebtModal';
import { DeleteDebtModal } from '@src/components/Modal/Debt/DeleteDebtModal/DeleteDebtModal';
import { EditDebtModal } from '@src/components/Modal/Debt/EditDebtModal/EditDebtModal';
import { ReopenDebtModal } from '@src/components/Modal/Debt/ReopenDebtModal/ReopenDebtModal';

export const Modal: React.FC = () => {
	const modalType = useAppSelector(selectModal).type;
	const modalContent = useAppSelector(selectModal).content;
	const modalRef = useRef<HTMLDivElement>(null);
	const dispatch = useAppDispatch();
	
	const closeModal = () => {
		dispatch(baseSlice.actions.resetModal());
	};
	
	const escHandler = (e) => {
		if (e.key === 'Escape') {
			closeModal();
		}
	};
	
	useEffect(() => {
		document.body.style.overflowY = 'hidden';
		document.body.style.paddingRight = 'calc(17px - (100vw - 100%))';
		document.addEventListener('keydown', escHandler);
		
		return () => {
			document.body.style.overflowY = 'scroll';
			closeModal();
			document.removeEventListener('keydown', escHandler);
		};
	}, []);
	
	const generateModalContent = () => {
		switch (modalType) {
		case MODALS.closeDebt:
			return (
				<CloseDebtModal
					debt={modalContent.debt}
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
		case MODALS.reduceDebt:
			return (
				<ReduceDebtModal
					debt={modalContent.debt}
				/>
			);
		case MODALS.increaseDebt:
			return (
				<IncreaseDebtModal
					debt={modalContent.debt}
				/>
			);
		case MODALS.deleteDebt:
			return (
				<DeleteDebtModal
					debt={modalContent.debt}
				/>
			);
		case MODALS.editDebt:
			return (
				<EditDebtModal
					debt={modalContent.debt}
				/>
			);
		case MODALS.reopenDebt:
			return (
				<ReopenDebtModal
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
					<ModalClose className="icon-cancel" onClick={() => closeModal()}/>
					{generateModalContent()}
				</ModalWindow>
			</ModalBackground>
		)
	);
};
