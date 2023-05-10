import React from 'react';
import {Box, Center, Flex, Image, Text} from 'native-base';
import Data from '../../data/Data';
import Colors from '../../theme/colors';

const Promo = ({mr}) => {
  return (
    <Flex flexDirection={'row'} mr={mr} p={'10px'}>
      {Data.map(item => {
        return (
          <Box
            key={item.id}
            w={'140px'}
            h={'170px'}
            bg={Colors.neutral[50]}
            shadow={1}
            borderRadius={8}
            px={'10px'}
            py={'5px'}
            mr={'10px'}>
            <Center>
              <Image
                source={{uri: `${item.image}`}}
                alt={'img'}
                w={'100%'}
                h={'80px'}
                borderRadius={8}
              />
            </Center>
            <Text
              numberOfLines={2}
              mt={'5px'}
              h={'38px'}
              fontFamily={'Inter'}
              fontSize={'12px'}
              fontWeight={'600'}
              color={Colors.neutral[900]}>
              {item.title}
            </Text>
            <Text
              fontFamily={'Inter'}
              fontSize={'12px'}
              fontWeight={500}
              color={Colors.neutral[900]}>
              {item.newPrice}
            </Text>
            <Text
              fontFamily={'Inter'}
              fontSize={'10px'}
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
