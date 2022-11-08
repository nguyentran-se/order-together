import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import CardItem from 'components/CardItem';
import Modal from 'components/Modal';
import { useAppSelector } from 'hooks';
import { useState } from 'react';
import { selectOrders } from 'selectors';
import { createOrders } from 'slices/orders/orders.saga';
import { useAppDispatch } from 'store';
function OrderDrawer({ isDrawerOpen, onDrawerClose }: any) {
  const [selectedItem, setSelectedItem] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const orders = useAppSelector(selectOrders);
  const ordersList = Object.keys(orders);
  const dispatch = useAppDispatch();
  const handleDeleteItem = (data: any) => {
    onOpen();
    setSelectedItem(data);
  };
  const handleConfirmOrders = () => {
    dispatch(createOrders(orders));
  };
  return (
    <>
      <Modal isModalOpen={isOpen} onModalClose={onClose} selectedItem={selectedItem}></Modal>
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={onDrawerClose}
        size="md"
        blockScrollOnMount={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>My orders</DrawerHeader>

          <DrawerBody>
            {ordersList.length > 0 ? (
              ordersList.map((tableId: string, index) => {
                return (
                  <Flex flexDirection="column" key={index}>
                    {Object.values(orders[tableId]).map((order, id) => {
                      return (
                        <CardItem
                          key={id}
                          data={order}
                          isInCart
                          tableId={tableId}
                          onConfirmDelete={handleDeleteItem}
                        />
                      );
                    })}
                  </Flex>
                );
              })
            ) : (
              <Box>
                <Text>No items to show</Text>
              </Box>
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onDrawerClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleConfirmOrders}>
              Confirm
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default OrderDrawer;
