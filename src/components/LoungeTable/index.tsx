import { Box, Flex, Image } from '@chakra-ui/react';
import Link from 'next/link';
import styles from './index.module.scss';

interface loungeTableProps {
  name?: string;
  available?: boolean;
  numberOfParticipants?: number;
  tableInfo?: any;
}

function LoungeTable({
  name,
  available = true,
  numberOfParticipants = 0,
  tableInfo = {},
}: loungeTableProps) {
  // console.log(tableInfo);
  return (
    <Link href={'/lounge/' + tableInfo.ID}>
      <a>
        <Box className={`${styles.LoungeTable}`}>
          {Object.keys(tableInfo).length > 0 ? (
            <Flex className={styles['LoungeTable__Overview']}>
              <Flex className={styles['LoungeTable__Overview--Image']}>
                <Image src={tableInfo.photoHref} alt="restaurant"></Image>
              </Flex>
              <Flex
                className={styles['LoungeTable__Overview--Info']}
                flexDirection="column"
                alignItems="flex-start"
              >
                <Box>
                  <h2>{tableInfo.name}</h2>
                </Box>
                <Box>Host by: {tableInfo.host}</Box>
                <Box>Rating: {tableInfo.rating}</Box>
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
