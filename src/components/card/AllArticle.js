import React, {useContext, useEffect} from 'react';
import {
  Box,
  FlatList,
  HStack,
  Image,
  Pressable,
  Stack,
  Text,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../theme/colors';
import {useState} from 'react';
import {AuthContext} from '../../controller/AuthContext';
import {API_Article} from '../../controller/API_Article';
import HTMLContentView from 'react-native-htmlview';
import RenderHTML from 'react-native-render-html';
import {useWindowDimensions} from 'react-native';

const AllArticle = ({searchText}) => {
  const [article, setArticle] = useState([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const {width} = useWindowDimensions();

  useEffect(() => {
    const loadArticle = async () => {
      if (user.accessToken) {
        const articleData = await API_Article(user.accessToken);
        setArticle(articleData);
      }
    };
    loadArticle();
  }, [user.accessToken]);

  const handleArticlePress = id => {
    navigation.navigate('ArticleDetail', {id});
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const filteredData = article.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderItem = ({item}) => {
    const formattedDate = formatDate(item.createdAt);
    return (
      <Pressable
        onPress={() => handleArticlePress(item.id)}
        my={'5px'}
        mx={'18px'}>
        <Stack
          w={'100%'}
          borderRadius={8}
          p={'8px'}
          space={'8px'}
          shadow={1}
          bg={Colors.neutral[50]}>
          <HStack h={'103px'} space={'8px'}>
            <Box w={'40%'}>
              <Image
                borderRadius={8}
                h={'100%'}
                w={'100%'}
                source={{uri: `${item.img_url}`}}
                alt="image_item"
              />
            </Box>
            <Stack pr={'8px'} w={'60%'} justifyContent={'space-evenly'}>
              <Text
                numberOfLines={2}
                fontFamily={'Inter'}
                fontSize={'14px'}
                fontWeight={600}
                color={Colors.neutral[900]}>
                {item.title}
              </Text>
              <Text
                numberOfLines={2}
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={500}
                color={Colors.neutral[900]}>
                {formattedDate}
              </Text>
              <Stack h={'32px'} overflow={'hidden'}>
                <HTMLContentView
                  numberOfLines={2}
                  value={item.content}
                  stylesheet={{
                    p: {
                      textAlign: 'justify',
                      fontSize: 12,
                      lineHeight: 16,
                    },
                  }}
                />
              </Stack>
            </Stack>
          </HStack>
        </Stack>
      </Pressable>
    );
  };
  return (
    <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default AllArticle;
