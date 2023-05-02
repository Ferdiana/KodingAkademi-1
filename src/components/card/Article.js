import React from 'react';
import {Box, Center, Flex, Image, Text} from 'native-base';
import Data from '../../data/Data';

const Article = ({flexDirection, mr}) => {
  // const today = new Date();
  return (
    <Flex flexDirection={flexDirection} mr={mr}>
      {Data.map(Article => {
        // const courseDate = new Date(Article);s
        // const isActive = courseDate > today;
        return (
          <Box
            key={Article.id}
            w={'140px'}
            bg={'primary.500'}
            borderRadius={10}
            padding={2}
            // opacity={isActive ? 0.4 : 1}
            // pointerEvents={isActive ? 'auto' : 'none'}
            mr={2}>
            <Center>
              <Image
                source={{uri: `${Article.image}`}}
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
              fontWeight={700}
              color={'neutral.50'}>
              {Article.title}
            </Text>
            <Text
              fontFamily={'Inter'}
              fontWeight={200}
              fontSize={'2xs'}
              color={'neutral.50'}>
              {Article.date}
            </Text>
          </Box>
        );
      })}
    </Flex>
  );
};

export default Article;
