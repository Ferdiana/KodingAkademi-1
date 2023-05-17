import {Center, Image, ScrollView, Stack, Text} from 'native-base';
import React from 'react';
import {AllArticle, SearchBar} from '../components';
import Colors from '../theme/colors';
import {useState} from 'react';
import {useRoute} from '@react-navigation/native';
import Data from '../data/Data';
import {useContext} from 'react';
import {AuthContext} from '../controller/AuthContext';
import {useEffect} from 'react';
import HTMLContentView from 'react-native-htmlview';
import {API_ArticleDetail} from '../controller/API_Article';

const ArticleDetailScreen = ({route}) => {
  const {user} = useContext(AuthContext);
  const [ArticleDetail, setArticleDetail] = useState({});

  useEffect(() => {
    const {id} = route.params;
    const loadArticleDetail = async () => {
      const response = await API_ArticleDetail(id, user.accessToken);
      if (response) {
        setArticleDetail(response);
      }
    };

    loadArticleDetail();
  }, [route.params, user.accessToken]);

  return (
    <Stack flex={1} bg={Colors.neutral[50]} px={'18px'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center w={'100%'} h={'324px'} my={'10px'}>
          <Image
            borderRadius={8}
            h={'100%'}
            w={'100%'}
            source={{uri: `${ArticleDetail.img_url}`}}
            alt="img_ArticleDetail"
          />
        </Center>
        <Stack space={'6px'}>
          <Text
            fontFamily={'Inter'}
            fontSize={'20px'}
            fontWeight={600}
            color={Colors.secondary[50]}>
            {ArticleDetail.title}
          </Text>
          <Text fontFamily={'Inter'} fontSize={'12px'} fontWeight={500}>
            {ArticleDetail.createdAt}
          </Text>
          <HTMLContentView
            numberOfLines={2}
            value={ArticleDetail.content}
            stylesheet={{
              p: {
                textAlign: 'justify',
                fontSize: 14,
                lineHeight: 18,
              },
            }}
          />
        </Stack>
      </ScrollView>
    </Stack>
  );
};

export default ArticleDetailScreen;
