import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../../src/assets/styles/orders.module.scss';
const Orders: NextPage = () => {
  console.log(styles.Order);

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
