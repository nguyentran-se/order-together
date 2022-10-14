import { Button, Container } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginWithSlack } from "slices/auth/authSaga";
import styles from '../assets/styles/home.module.scss';

const Home: NextPage = () => {
  const router = useRouter();
  const { code } = router.query;
  const dispatch = useDispatch();

  useEffect(() => {
    if (code) {
      dispatch(loginWithSlack(code as string));
    }
  }, [code]);

  return (
    <>
      <Head>
        <title>Order Together | Home</title>
        <meta name="description" content="Order Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className={styles.background}>
    </div>
    </>
  );
};

export default Home;
