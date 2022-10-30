import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addOrder, editOrderAmount } from 'slices/orders';
import { AMOUNT } from 'utils/constant';
import styles from './index.module.scss';

function CardItem({ data, isInCart = false, tableId, onConfirmDelete }: any) {
  const dispatch = useDispatch();
  const router = useRouter();
  const onAddItem = (itemData: any) => {
    dispatch(
      addOrder({
        orderId: itemData.ID,
        orderDetail: itemData,
        tableId: router.query.loungeId,
      }),
    );
  };

  const onConfirmDeleteOrder = () => {
    onConfirmDelete({
      orderId: data.ID,
      tableId: router.query.loungeId,
    });
  };

  const incAndDecAmount = (incOrDec: string = AMOUNT.INCREASE, amount: number) => {
    if (incOrDec == AMOUNT.DECREASE) {
      amount = amount * -1;
    }
    const payload = {
      tableId,
      orderId: data.ID,
      numberOfIncrease: amount,
    };
    dispatch(editOrderAmount(payload));
  };
  const discount = data.priceInMinorUnit - data.discountedPriceInMin;
  return (
    <Box className={styles.TableCard}>
      {isInCart && (
        <Box position="absolute" zIndex="20" top={0} right={0}>
          <Button onClick={() => onConfirmDeleteOrder()}>x</Button>
        </Box>
      )}
      <Box>
        <Box w={'full'}></Box>
        <Box className={styles.TableCard__Item}>
          <Box>
            <Box className={styles.TableCard__ItemPhoto}>
              <Image src={data.imgHref}></Image>
            </Box>
          </Box>
          <Flex className={styles.TableCard__ItemContent} w="full">
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
                <Box w="full">
                  {!!discount && discount > 0 && (
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
                  )}
                  <Flex justifyContent={'space-between'} w="full">
                    <Box className={styles.TableCard__ItemDiscount} mt={0}>
                      <strong>{data.discountedPriceInMin}</strong>
                    </Box>

                    {isInCart ? (
                      <Flex>
                        <Button
                          onClick={() => {
                            if (data.amount > 1) {
                              incAndDecAmount(AMOUNT.DECREASE, 1);
                            } else {
                              onConfirmDeleteOrder();
                            }
                          }}
                        >
                          -
                        </Button>
                        <Box p="6px" w="40px" border="2px solid #eee">
                          <Text align="center">{data.amount}</Text>
                        </Box>
                        <Button
                          onClick={() => {
                            incAndDecAmount(AMOUNT.INCREASE, 1);
                          }}
                        >
                          +
                        </Button>
                      </Flex>
                    ) : (
                      <Box>
                        <Button
                          colorScheme={'green'}
                          onClick={() => {
                            onAddItem(data);
                          }}
                        >
                          <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </Button>
                      </Box>
                    )}
                  </Flex>
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
