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
import { selectOrders } from 'selectors/orders.selector';

function OrderDrawer({ isOpen, onClose }: any) {
  const orders = useAppSelector(selectOrders);
  const ordersList = Object.keys(orders.data);
  console.log(ordersList);
  return (
    <>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="md">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>My orders</DrawerHeader>

          <DrawerBody>
            {ordersList.map((tableId: string) => {
              console.log(orders.data[tableId]);
              return (
                <>
                  <Flex flexDirection="column">
                    {Object.values(orders.data[tableId]).map((order, id) => {
                      return <CardItem key={id} data={order} />;
                    })}
                  </Flex>
                </>
              );
            })}
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default OrderDrawer;
