import { Box, Flex } from '@chakra-ui/react';
import CardItem from 'components/CardItem';

interface catogory {
  ID: string;
  available: boolean;
  items: any[];
  name: string;
  sortOrder: number;
}

function CardList({ data }: any) {
  return (
    <>
      {data.categories.map((catogory: any, id: string) => {
        return (
          <Box key={id}>
            <h2>{catogory.name}</h2>
            <Flex flexFlow="row wrap">
              {catogory.items.map((item: any, id: string) => (
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
