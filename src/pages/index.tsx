import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { PathNames } from 'configs';
import { useAppSelector } from 'hooks';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectIsLoggedIn } from 'selectors/common.selector';
import { loginWithSlack } from 'slices/auth/authSaga';
import styles from '../assets/styles/home.module.scss';

const Home: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isLoggedIn = useAppSelector(selectIsLoggedIn);

  const { code } = router.query;

  useEffect(() => {
    if (isLoggedIn) router.replace(PathNames.LOUNGE, undefined, { shallow: true });
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (code) {
      dispatch(
        loginWithSlack({
          code: code as string,
          succeedCallback: () => {
            router.replace(PathNames.LOUNGE, undefined, { shallow: true });
          },
        }),
      );
    }
  }, [code, dispatch, router]);

  //TODO: this is for test, will be removed in next feature
  async function handleLogin() {
    const res = await axios.get('/api/menu', {
      params: {
        url: 'https://food.grab.com/vn/vi/restaurant/c%C6%A1m-t%E1%BA%A5m-c%C6%A1m-s%C6%B0%E1%BB%9Dn-n%C6%B0%E1%BB%9Bng-l%C3%A2m-th%C3%BAy-delivery/5-C3E3WAAAERLXRN',
      },
    });
    console.log(res);
  }

  const renderButton = () => {
    return (
      <Button colorScheme="blue" variant="solid" onClick={handleLogin}>
        Sign in
      </Button>
    );
  };

  return (
    <>
      <Head>
        <title>Order Together | Home</title>
        <meta name="description" content="Order Together" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.background}></div>
    </>
  );
};

export default Home;
