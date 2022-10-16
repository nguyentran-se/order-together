import { Button, Flex } from '@chakra-ui/react';
import LoungeTable from 'components/LoungeTable';
import { useAppSelector } from 'hooks';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { selectAuthFirebaseUid, selectAuthUserProfile } from 'selectors';
import { getUserSlackInfor } from 'slices/authFirebase/authFirebase.saga';
import { createLounge, getLounges } from 'slices/lounge/lounge.saga';
import { isEmpty } from 'utils';
import dummyPayload from './dummyPayload.json';
import styles from './index.module.scss';

const Lounge: NextPage = () => {
  const uid = useAppSelector(selectAuthFirebaseUid);
  const userSlack = useAppSelector(selectAuthUserProfile);
  const dispatch = useDispatch();

  useEffect(() => {
    if (uid && isEmpty(userSlack)) dispatch(getUserSlackInfor(uid));
  }, [dispatch, uid, userSlack]);

  useEffect(() => {
    dispatch(getLounges());
  }, [dispatch]);

  const fakeData = [
    {
      id: 0,
      hostName: 'Bao',
    },
    {
      id: 1,
      hostName: 'Bao',
    },
    {
      id: 2,
      hostName: 'Bao',
    },
    {
      id: 3,
      hostName: 'Bao',
    },
    {
      id: 4,
      hostName: 'Bao',
    },
  ];
  const dummyData = Object.values(dummyPayload.entities)[0];
  const dummyOverviewData = {
    ID: dummyData.ID,
    name: dummyData.name,
    rating: dummyData.rating,
    status: 'available',
    host: 'Bao',
    photoHref: dummyData.photoHref,
  };
  async function handleCreateLounge() {
    //TODO: create Modal to submit lounge form.
    const URL =
      'https://food.grab.com/vn/vi/restaurant/c%C6%A1m-t%E1%BA%A5m-c%C6%A1m-s%C6%B0%E1%BB%9Dn-n%C6%B0%E1%BB%9Bng-l%C3%A2m-th%C3%BAy-delivery/5-C3E3WAAAERLXRN';
    dispatch(createLounge(URL));
  }
  return (
    <>
      <Head>
        <title>Order Together | Food Lounge</title>
        <meta name="description" content="Lounge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Button onClick={handleCreateLounge} colorScheme="blue">
        Create lounge
      </Button>
      <Flex flexWrap="wrap" className={styles.Lounge}>
        <Flex direction="column" width="full">
          <Flex flexWrap="wrap" marginTop={20} justifyContent="center" columnGap={10}>
            <Flex key={100} marginBottom={20} flexBasis="30%" justifyContent="center">
              {/* <h4>{table.hostName}</h4> */}
              <LoungeTable tableInfo={dummyOverviewData}></LoungeTable>
            </Flex>
            {fakeData.map((table) => {
              return (
                <Flex key={table.id} marginBottom={20} flexBasis="30%" justifyContent="center">
                  {/* <h4>{table.hostName}</h4> */}
                  <LoungeTable name={table.hostName}></LoungeTable>
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
