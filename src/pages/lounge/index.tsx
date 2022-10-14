import { Button, Flex } from "@chakra-ui/react";
import LoungeTable from "components/LoungeTable";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from './index.module.scss';
import dummyPayload from './dummyPayload.json'

const Lounge: NextPage = () => {
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
  }
  return (
    <>
      <Head>
        <title>Order Together | Food Lounge</title>
        <meta name="description" content="Lounge" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Flex
        flexWrap="wrap"
        className={styles.Lounge}
      >
        <Flex direction="column" width="full">
          <Flex flexWrap='wrap' marginTop={20} justifyContent='center' columnGap={10}>
            <Flex key={100} marginBottom={20} flexBasis='30%' justifyContent='center'>
              {/* <h4>{table.hostName}</h4> */}
              <LoungeTable tableInfo={dummyOverviewData}></LoungeTable>
            </Flex>
            {fakeData.map(table => {
              return (
                <Flex key={table.id} marginBottom={20} flexBasis='30%' justifyContent='center'>
                  {/* <h4>{table.hostName}</h4> */}
                  <LoungeTable name={table.hostName}></LoungeTable>
                </Flex>
              )
            })}
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export default Lounge;
