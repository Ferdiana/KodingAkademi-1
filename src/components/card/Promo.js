import React from 'react';
import {Box, Center, Flex, Image, Text} from 'native-base';
import Data from '../../data/Data';

const Promo = ({flexDirection, mr}) => {
  // const today = new Date();
  return (
    <Flex flexDirection={flexDirection} mr={mr}>
      {Data.map(item => {
        return (
          <Box
            key={item.id}
            w={'140px'}
            borderWidth={1}
            borderColor={'primary.500'}
            borderRadius={10}
            padding={2}
            mr={2}>
            <Center>
              <Image
                source={{uri: `${item.image}`}}
                alt={'img'}
                w={'100%'}
                h={'80px'}
                borderRadius={10}
              />
            </Center>
            <Text
              mt={2}
              h={'48px'}
              fontSize={'sm'}
              fontWeight={'700'}
              color={'primary.500'}>
              {item.title}
            </Text>
            <Text fontSize={'sm'} fontWeight={600} color={'neutral.900'}>
              {item.newPrice}
            </Text>
            <Text
              fontSize={'sm'}
              fontWeight={500}
              color={'neutral.200'}
              strikeThrough>
              {item.oldPrice}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
};

export default Promo;
