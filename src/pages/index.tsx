import styles from 'assets/styles/home.module.scss';
import { PathNames } from 'configs';
import { useAppSelector } from 'hooks';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectIsLoggedIn } from 'selectors/common.selector';
import { loginWithSlack } from 'slices/auth/auth.saga';

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
