import React from 'react';
import {Box, Center, Flex, Image, Text} from 'native-base';
import Data from '../../data/Data';
import Colors from '../../theme/colors';

const Article = ({mr}) => {
  return (
    <Flex flexDirection={'row'} mr={mr} p={'10px'}>
      {Data.map(item => {
        return (
          <Box
            key={item.id}
            w={'140px'}
            h={'170px'}
            px={'10px'}
            pt={'5px'}
            mr={2}
            bg={Colors.neutral[50]}
            borderRadius={8}
            shadow={1}>
            <Center>
              <Image
                source={{uri: `${item.image}`}}
                alt={'img'}
                w={'100%'}
                h={'84px'}
                borderRadius={8}
              />
            </Center>
            <Text
              numberOfLines={2}
              mt={'5px'}
              h={'38px'}
              fontFamily={'Inter'}
              fontSize={'12px'}
              fontWeight={600}
              color={Colors.neutral[900]}>
              {item.title}
            </Text>
            <Text
              mt={'5px'}
              fontFamily={'Inter'}
              fontWeight={300}
              fontSize={'10px'}
              color={Colors.neutral[900]}>
              {item.date}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
};

export default Article;
