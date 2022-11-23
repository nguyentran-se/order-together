import { Box, Button, Flex, Heading, Input, Stack, Text } from '@chakra-ui/react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import LoungeTable from 'components/LoungeTable';
import ModalWrapper from 'components/Modal_new';
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
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTableCreating, setTableCreating] = useState({
    isLoading: false,
    isSucceed: false,
  });

  const title = 'Tạo phòng';

  useEffect(() => {
    if (uid && isEmpty(userSlack)) dispatch(getUserSlackInfor(uid));
  }, [dispatch, uid, userSlack]);

  useEffect(() => {
    if (isLoggedIn) dispatch(getLounges());
  }, [dispatch, isLoggedIn]);

  const onCreateLoungeSucceed = () => {
    setTableCreating({
      isLoading: false,
      isSucceed: true,
    });
    return;
  };

  const onCreateLoungeFailed = () => {
    setTableCreating({
      isLoading: false,
      isSucceed: false,
    });
    return;
  };

  async function handleCreateLounge() {
    const URL = url;
    setTableCreating({
      ...isTableCreating,
      isLoading: true,
    });
    dispatch(
      createLounge({
        url: URL,
        succeedCallback: onCreateLoungeSucceed,
        failedCallback: onCreateLoungeFailed,
      }),
    );
  }

  return (
    <>
      <Head>
        <title>Order Together | Food Lounge</title>
        <meta name="description" content="Lounge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex justifyContent="space-between">
        <Box>
          <Heading variant="custom" size="xl">
            Hôm nay ăn gì
          </Heading>
        </Box>
        <Box>
          <Button onClick={() => setModalOpen(true)} colorScheme="blue">
            Tạo phòng +
          </Button>
        </Box>
      </Flex>
      <ModalWrapper isModalOpen={isModalOpen} setModalOpen={setModalOpen} title={title}>
        <Stack>
          <Box>
            <Text>Foodstore link:</Text>
          </Box>

          <Flex>
            <Input
              colorScheme={'blackAlpha'}
              placeholder="Put a grab link here"
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              marginRight="5px"
            ></Input>
            {isTableCreating.isSucceed ? (
              <Button
                onClick={() => {}}
                colorScheme="whatsapp"
                isLoading={isTableCreating.isLoading}
              >
                Done <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
              </Button>
            ) : (
              <Button
                onClick={handleCreateLounge}
                colorScheme="blue"
                isLoading={isTableCreating.isLoading}
              >
                Create
              </Button>
            )}
          </Flex>
        </Stack>
      </ModalWrapper>

      <Flex flexWrap="wrap" className={styles.Lounge}>
        <Flex direction="column" width="full">
          <Flex flexWrap="wrap" justifyContent="flex-start" columnGap={10} m={5}>
            {lounge.map((table) => {
              return (
                <Flex key={table.lid} marginBottom={20} flexBasis="30%" justifyContent="flex-start">
                  <LoungeTable table={table}></LoungeTable>
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
