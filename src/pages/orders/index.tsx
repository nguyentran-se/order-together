import { Box, Flex, Text } from '@chakra-ui/react';
import styles from 'assets/styles/orders.module.scss';
import CardItem from 'components/CardItem';
import { useAppSelector } from 'hooks';
import type { NextPage } from 'next';
import Head from 'next/head';
import { selectOrders } from 'selectors';
const Orders: NextPage = () => {
  const orders = useAppSelector(selectOrders);
  const ordersList = Object.keys(orders);
  return (
    <div className={styles.Order}>
      <Head>
        <title>Order Together | Orders</title>
        <meta name="description" content="Order" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {ordersList.length > 0 ? (
          ordersList.map((tableId: string) => {
            console.log(orders);
            return (
              <>
                <Flex flexDirection="column">
                  {Object.values(orders[tableId]).map((order, id) => {
                    return <CardItem key={id} data={order} isInCart tableId={tableId} />;
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
      </div>
    </div>
  );
};

export default Orders;
