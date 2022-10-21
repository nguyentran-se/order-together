import styles from 'assets/styles/orders.module.scss';
import type { NextPage } from 'next';
import Head from 'next/head';
const Orders: NextPage = () => {
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
