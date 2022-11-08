import {
  Modal as ModalChakra,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import { useEffect } from 'react';

import styles from './index.module.scss';

function ModalWrapper({ children, title, isModalOpen, setModalOpen }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  useEffect(() => {
    if (isModalOpen) onOpen();
  }, [isModalOpen, onOpen]);
  return (
    <div className={styles.Modal}>
      <ModalChakra
        isOpen={isOpen && isModalOpen}
        onClose={() => {
          onClose();
          setModalOpen(false);
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader borderBottom="solid 1px #eee">{title || 'Title'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody p="16px 24px 30px 24px">{children}</ModalBody>
        </ModalContent>
      </ModalChakra>
    </div>
  );
}

export default ModalWrapper;
