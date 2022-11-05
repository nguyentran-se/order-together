import styles from 'assets/styles/orders.module.scss';
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
      Order Page
    </div>
  );
};

export default Orders;
