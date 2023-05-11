import {Center, Image, Stack, Text} from 'native-base';
import React from 'react';
import {AllArticle, SearchBar} from '../components';
import Colors from '../theme/colors';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Data from '../data/Data';

const ArticleDetailScreen = () => {
  const route = useRoute();
  const {id} = route.params;

  const article = Data.find(item => item.id === id);

  return (
    <Stack flex={1} bg={Colors.neutral[50]} px={'18px'}>
      <Center w={'100%'} h={'324px'} my={'10px'}>
        <Image
          borderRadius={8}
          h={'100%'}
          w={'100%'}
          source={{uri: `${article.image}`}}
          alt="img_article"
        />
      </Center>
      <Stack space={'6px'}>
        <Text
          fontFamily={'Inter'}
          fontSize={'20px'}
          fontWeight={600}
          color={Colors.secondary[50]}>
          {article.title}
        </Text>
        <Text fontFamily={'Inter'} fontSize={'12px'} fontWeight={500}>
          {article.date}
        </Text>
        <Text
          fontFamily={'Inter'}
          fontSize={'12px'}
          fontWeight={400}
          textAlign={'justify'}>
          {article.desc}
        </Text>
      </Stack>
    </Stack>
  );
};

export default ArticleDetailScreen;
