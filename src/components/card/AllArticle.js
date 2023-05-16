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
import {API_Events} from '../../controller/API_Events';

const AllArticle = ({searchText}) => {
  const [article, setArticle] = useState([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const loadArticle = async () => {
      if (user.accessToken) {
        const articleData = await API_Article(user.accessToken);
        setArticle(articleData);
      }
    };
    loadArticle();
  }, [user.accessToken]);

  console.log(article);

  const handleArticlePress = id => {
    navigation.navigate('ArticleDetail', {id});
  };

  // const filteredData = article.filter(
  //   item => item.title.toLowerCase().includes(searchText.toLowerCase()),
  //   // (selectedCategory === null || item.category.name === selectedCategory),
  // );

  // const renderItem = ({article}) => {
  //   return (
  //     <Pressable
  //       onPress={() => handleArticlePress(article.id)}
  //       my={'5px'}
  //       mx={'18px'}>
  //       <Stack
  //         w={'100%'}
  //         borderRadius={8}
  //         p={'8px'}
  //         space={'8px'}
  //         shadow={1}
  //         bg={Colors.neutral[50]}>
  //         <HStack h={'103px'} space={'8px'}>
  //           <Box w={'40%'}>
  //             <Image
  //               borderRadius={8}
  //               h={'100%'}
  //               w={'100%'}
  //               source={{uri: `${article.img_url}`}}
  //               alt="image_article"
  //             />
  //           </Box>
  //           <Stack pr={'8px'} w={'60%'} justifyContent={'space-evenly'}>
  //             <Text
  //               numberOfLines={2}
  //               fontFamily={'Inter'}
  //               fontSize={'14px'}
  //               fontWeight={600}
  //               color={Colors.neutral[900]}>
  //               {article.title}
  //             </Text>
  //             <Text
  //               numberOfLines={2}
  //               fontFamily={'Inter'}
  //               fontSize={'12px'}
  //               fontWeight={500}
  //               color={Colors.neutral[900]}>
  //               {article.createdAt}
  //             </Text>
  //             <Text
  //               numberOfLines={2}
  //               fontFamily={'Inter'}
  //               fontSize={'12px'}
  //               fontWeight={400}
  //               textAlign={'justify'}
  //               color={Colors.neutral[700]}>
  //               {article.content}
  //             </Text>
  //           </Stack>
  //         </HStack>
  //       </Stack>
  //     </Pressable>
  //   );
  // };
  return (
    <FlatList
      data={article}
      // renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default AllArticle;
