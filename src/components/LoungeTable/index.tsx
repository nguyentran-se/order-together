import { Box, Flex, Image } from '@chakra-ui/react';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LoungeData } from '@types';
import Link from 'next/link';
import { isEmpty } from 'utils';
import ActiveAvatarGroup from './ActiveAvatarGroup';
import styles from './index.module.scss';

interface loungeTableProps {
  table: LoungeData;
  available?: boolean;
  numberOfParticipants?: number;
}

function LoungeTable({ table, name }: any) {
  const data = table.entities[table.activeMerchantID];
  if (isEmpty(data)) return <>Loading</>;

  return (
    <Link href={'/lounge/' + table?.lid}>
      {/* <LinkOverlay> */}
      <Box className={`${styles.LoungeTable}`}>
        {Object.keys(data || {}).length > 0 ? (
          <Flex className={styles['LoungeTable__Overview']} flexDirection="column">
            <Box className={styles['LoungeTable__Overview--Hostname']}>
              <strong>{host.name}</strong>
            </Box>
            <Flex className={styles['LoungeTable__Overview--Image']}>
              <Image src={data?.photoHref} alt="restaurant"></Image>
            </Flex>
            <Flex
              p="16px"
              className={styles['LoungeTable__Overview--Info']}
              flexDirection="column"
              alignItems="flex-start"
            >
              <Box>
                <strong>{data?.name}</strong>
              </Box>
              <Flex justifyContent="space-between" w="full">
                <Flex alignItems="center">
                  <FontAwesomeIcon icon={faClock} color="#6D7176"></FontAwesomeIcon>
                  <span>&nbsp;Closing in 10 minutes</span>
                </Flex>
                <Box>
                  <ActiveAvatarGroup></ActiveAvatarGroup>
                </Box>

              </Flex>
            </Flex>
          </Flex>
        ) : (
          <></>
        )}
      </Box>
      {/* </LinkOverlay> */}
    </Link>
  );
}

export default LoungeTable;
