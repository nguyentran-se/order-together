import { Box, Flex, Text } from '@chakra-ui/react';
import styles from 'assets/styles/orders.module.scss';
import CardItem from 'components/CardItem';
import { useAppSelector } from 'hooks';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectConfirmedOrders, selectIsLoggedIn } from 'selectors';
import { getOrdersByUid } from 'slices/orders/orders.saga';

const Orders: NextPage = () => {
  const dispatch = useDispatch();
  const confirmedOrders = useAppSelector(selectConfirmedOrders);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  useEffect(() => {
    if (isLoggedIn) dispatch(getOrdersByUid());
  }, [dispatch, isLoggedIn]);

  return (
    <div className={styles.Order}>
      <Head>
        <title>Order Together | Orders</title>
        <meta name="description" content="Order" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        {confirmedOrders.length > 0 ? (
          confirmedOrders.map((confirmedOrder: any, index: number) => {
            console.log(confirmedOrders);
            return (
              <Flex flexDirection="column" key={index}>
                {Object.values(confirmedOrder.confirmed).map((order, id) => {
                  return (
                    <CardItem
                      key={id}
                      data={order}
                      isInCart
                      tableId={confirmedOrder.oid}
                      onConfirmDelete={() => {}}
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
      </div>
    </div>
  );
};

export default Orders;
