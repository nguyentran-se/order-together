import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
} from '@chakra-ui/react';
import CardItem from 'components/CardItem';
import { useAppSelector } from 'hooks';
import { useDispatch } from 'react-redux';
import { selectOrders } from 'selectors';
import { createOrders } from 'slices/orders/orders.saga';

function OrderDrawer({ isOpen, onClose }: any) {
  const orders = useAppSelector(selectOrders);
  const ordersList = Object.keys(orders);
  const dispatch = useDispatch();
  function handleCreateOrders() {
    dispatch(createOrders(orders));
  }
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>My orders</DrawerHeader>

          <DrawerBody>
            {ordersList.map((tableId: string, index) => {
              return (
                <Flex flexDirection="column" key={index}>
                  {Object.values(orders[tableId]).map((order, id) => {
                    return <CardItem key={id} data={order} />;
                  })}
                </Flex>
              );
            })}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleCreateOrders}>
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default OrderDrawer;
