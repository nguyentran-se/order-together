import { Button, Flex, Input } from '@chakra-ui/react';
import LoungeTable from 'components/LoungeTable';
import { useAppSelector } from 'hooks';
import type { NextPage } from 'next';
import Head from 'next/head';
import { firebaseCore } from 'pages/_app';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  selectAuthFirebaseUid,
  selectAuthUserProfile,
  selectIsLoggedIn,
  selectLounge,
} from 'selectors';
import { getUserSlackInfor } from 'slices/authFirebase/authFirebase.saga';
import { createLounge, getLounges } from 'slices/lounge/lounge.saga';
import { isEmpty } from 'utils';
import styles from './index.module.scss';

const Lounge: NextPage = () => {
  const uid = useAppSelector(selectAuthFirebaseUid);
  const userSlack = useAppSelector(selectAuthUserProfile);
  const lounge = useAppSelector(selectLounge);
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const [url, setUrl] = useState('');

  useEffect(() => {
    if (uid && isEmpty(userSlack)) dispatch(getUserSlackInfor(uid));
  }, [dispatch, uid, userSlack]);

  useEffect(() => {
    if (isLoggedIn) dispatch(getLounges());
  }, [dispatch, isLoggedIn]);

  useEffect(() => {
    firebaseCore.loungeRef.on('child_added', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        console.log(snapshot.key, snapshot.val());
      });
    });

    return () => {};
  }, []);

  async function handleCreateLounge() {
    //TODO: create Modal to submit lounge form.
    // const URL =
    //   'https://food.grab.com/vn/vi/restaurant/c%C6%A1m-t%E1%BA%A5m-c%C6%A1m-s%C6%B0%E1%BB%9Dn-n%C6%B0%E1%BB%9Bng-l%C3%A2m-th%C3%BAy-delivery/5-C3E3WAAAERLXRN';
    const URL = url;
    dispatch(createLounge(URL));
  }
  return (
    <>
      <Head>
        <title>Order Together | Food Lounge</title>
        <meta name="description" content="Lounge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Bao bao</h1>
      <Input
        colorScheme={'blackAlpha'}
        onChange={(e) => {
          setUrl(e.target.value);
        }}
      ></Input>
      <Button onClick={handleCreateLounge} colorScheme="blue">
        Create lounge
      </Button>
      <Flex flexWrap="wrap" className={styles.Lounge}>
        <Flex direction="column" width="full">
          <Flex height={20} width={'full'} alignItems={'center'} backgroundColor="ButtonFace">
            <Flex ml={5}>
              <h1>Food Lounge</h1>
            </Flex>
            {/* <Flex alignSelf='flex-end'>
              <Button colorScheme='blackAlpha' size='lg' variant='ghost'><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon></Button>
              <Button colorScheme='blackAlpha' size='lg' variant='ghost'><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon></Button>
              <Button colorScheme='blackAlpha' size='lg' variant='ghost'><FontAwesomeIcon icon={faShoppingCart}></FontAwesomeIcon></Button>
            </Flex> */}
          </Flex>
          <Flex flexWrap="wrap" justifyContent="center" columnGap={10} m={5}>
            <Flex key={100} marginBottom={20} flexBasis="30%" justifyContent="center">
              {/* <h4>{table.hostName}</h4> */}
              {/* <LoungeTable tableInfo={dummyOverviewData}></LoungeTable> */}
            </Flex>
            {lounge.map((table) => {
              return (
                <Flex
                  key={table.activeMerchantID}
                  marginBottom={20}
                  flexBasis="30%"
                  justifyContent="center"
                >
                  {/* <h4>{table.hostName}</h4> */}
                  <LoungeTable
                    data={table.entities[table.activeMerchantID]}
                    name={table.owner}
                  ></LoungeTable>
                </Flex>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Lounge;
