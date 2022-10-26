import { Box, Flex, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { isEmpty } from 'utils';
import styles from './index.module.scss';

interface loungeTableProps {
  name?: string;
  available?: boolean;
  numberOfParticipants?: number;
  tableInfo?: any;
}

function LoungeTable({
  table,
  name,
  available = true,
  numberOfParticipants = 0,
  tableInfo = {},
}: any) {
  console.log(table);
  const data = table.entities[table.activeMerchantID];
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
                <Box>Host by: {data?.host}</Box>
                <Box>Rating: {data?.rating}</Box>
              </Flex>
            </Flex>
          ) : (
            <></>
          )}
          <h3>{name}</h3>
        </Box>
      </a>
    </Link>
  );
}

export default LoungeTable;
