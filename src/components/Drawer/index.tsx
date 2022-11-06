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

function OrderDrawer({ isDrawerOpen, onDrawerClose }: any) {
  const [selectedItem, setSelectedItem] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const orders = useAppSelector(selectOrders);
  const ordersList = Object.keys(orders);

  const handleDeleteItem = (data: any) => {
    onOpen();
    setSelectedItem(data);
  };
  return (
    <>
      <Modal isModalOpen={isOpen} onModalClose={onClose} selectedItem={selectedItem}></Modal>
      <Drawer isOpen={isDrawerOpen} placement="right" onClose={onDrawerClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>My orders</DrawerHeader>

          <DrawerBody>
            {ordersList.length > 0 ? (
              ordersList.map((tableId: string) => {
                console.log(orders[tableId]);
                return (
                  <>
                    <Flex flexDirection="column">
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
                  </>
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
            <Button colorScheme="blue">Confirm</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default OrderDrawer;
