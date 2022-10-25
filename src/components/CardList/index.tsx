import { Box, Flex } from '@chakra-ui/react';
import CardItem from 'components/CardItem';

function CardList({ data }: any) {
  return (
    <>
      {data.categories.map((catogory: any, id: any) => {
        return (
          <Box key={id}>
            <h2>{catogory.name}</h2>
            <Flex flexFlow="row wrap">
              {catogory.items.map((item: any, id: any) => (
                <CardItem key={id} data={item}></CardItem>
              ))}
            </Flex>
          </Box>
        );
      })}
    </>
  );
}

export default CardList;
