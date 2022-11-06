import {
  Button,
  Modal as ModalChakra,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { deleteOrder } from 'slices/orders';

import styles from './index.module.scss';

function Modal({ isModalOpen, onModalClose, selectedItem }: any) {
  const dispatch = useDispatch();
  const onDeleteOrder = () => {
    dispatch(deleteOrder(selectedItem));
    onModalClose();
  };

  return (
    <div className={styles.Modal}>
      <ModalChakra isOpen={isModalOpen} onClose={onModalClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="16px 24px">Bạn có muốn xóa mặt hàng này khỏi giỏ không?</ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={2} onClick={onDeleteOrder}>
              Có nha
            </Button>
            <Button variant="solid" onClick={onModalClose}>
              Khum
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalChakra>
    </div>
  );
}

export default Modal;
