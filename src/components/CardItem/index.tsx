import { Box, Flex, Image } from '@chakra-ui/react';
import styles from './index.module.scss';

function CardItem({ data }: any) {
  return (
    <Box className={styles.TableCard}>
      <Box>
        <Box w={'full'}></Box>
        <Box className={styles.TableCard__Item}>
          <Box>
            <Box className={styles.TableCard__ItemPhoto}>
              <Image src={data.imgHref}></Image>
            </Box>
          </Box>
          <Flex className={styles.TableCard__ItemContent}>
            <Flex flexDirection="column" w="full" h="full">
              <Flex
                flexDirection="column"
                flex={1}
                className={styles['TableCard__ItemContent--Description']}
              >
                {/* Tile */}
                <Flex pl={-1} pr={-1}>
                  <h3
                    style={{
                      paddingLeft: '4px',
                      paddingRight: '4px',
                    }}
                  >
                    {data.name}
                  </h3>
                </Flex>
                {/* Description */}
                <h6>{data.description}</h6>
              </Flex>
              {/* Price */}
              <Flex alignItems="flex-end">
                <Box>
                  <Box className={styles.TableCard__ItemDiscount}>
                    <Box className={styles['TableCard__ItemDiscount--Box']}>
                      <Box className={styles['TableCard__ItemDiscount--Text']}>
                        Ưu đãi -{data.priceInMinorUnit - data.discountedPriceInMin}
                      </Box>
                    </Box>
                    <h6 className={styles['TableCard__ItemDiscount--OriginPrice']}>
                      {data.priceInMinorUnit}
                    </h6>
                  </Box>
                  <Box className={styles.TableCard__ItemDiscount} mt={0}>
                    <strong>{data.discountedPriceInMin}</strong>
                  </Box>
                </Box>
                {/* Icon */}
                {/* <Box><Icon as={AddIcon}></Icon></Box> */}
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Box>
  );
}

export default CardItem;
