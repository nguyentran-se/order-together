import { Box, Flex, Image } from '@chakra-ui/react';
import { LoungeData } from '@types';
import Link from 'next/link';
import { isEmpty } from 'utils';
import styles from './index.module.scss';

interface loungeTableProps {
  table: LoungeData;
  available?: boolean;
  numberOfParticipants?: number;
}

function LoungeTable({ table, available = true, numberOfParticipants = 0 }: loungeTableProps) {
  // console.log(table);
  const data = table.entities[table.activeMerchantID];
  const host = table.host;
  if (isEmpty(data)) return <>Loading</>;

  return (
    <Link href={'/lounge/' + table?.lid}>
      <a>
        <Box className={`${styles.LoungeTable}`}>
          {Object.keys(data || {}).length > 0 ? (
            <Flex className={styles['LoungeTable__Overview']}>
              <Flex className={styles['LoungeTable__Overview--Image']}>
                <Image src={data?.photoHref} alt="restaurant"></Image>
              </Flex>
              <Flex
                className={styles['LoungeTable__Overview--Info']}
                flexDirection="column"
                alignItems="flex-start"
              >
                <Box>
                  <h2>{data?.name}</h2>
                </Box>
                <Box>Host by: {host.name}</Box>
                <Box>Rating: {data?.rating}</Box>
              </Flex>
            </Flex>
          ) : (
            <></>
          )}
          {/* <h3>{host.name}</h3> */}
        </Box>
      </a>
    </Link>
  );
}

export default LoungeTable;
