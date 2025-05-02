import { useDispatch, useSelector } from 'react-redux';
import { openModal, closeModal } from '../store/modalSlices';

export const useModal = () => {
  const dispatch = useDispatch();
  const { type, channel } = useSelector(state => state.modals);
  const isOpen = type !== null;

  const handleOpenModal = (modalType, channelData = null) => {
    dispatch(openModal({ type: modalType, channel: channelData }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return {
    isOpen,
    modalType: type,
    modalData: channel,
    openModal: handleOpenModal,
    closeModal: handleCloseModal,
  };
};
