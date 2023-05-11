import React from 'react';
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
import Data from '../../data/Data';
import Colors from '../../theme/colors';

const AllMyCourse = ({searchText}) => {
  const navigation = useNavigation();

  const handleArticlePress = id => {
    navigation.navigate('MyCourseDetail', {id});
  };

  const filteredData = Data.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderItem = ({item}) => {
    return (
      <Pressable
        onPress={() => handleArticlePress(item.id)}
        my={'5px'}
        mx={'18px'}>
        <Stack
          w={'100%'}
          borderRadius={8}
          p={'8px'}
          shadow={1}
          bg={Colors.neutral[50]}>
          <HStack h={'103px'} space={'8px'}>
            <Box w={'40%'}>
              <Image
                borderRadius={8}
                h={'100%'}
                w={'100%'}
                source={{uri: `${item.image}`}}
                alt="image_article"
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
                Until {''}
                {item.date}
              </Text>
              <Text
                numberOfLines={2}
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={400}
                textAlign={'justify'}
                color={Colors.neutral[700]}>
                {item.desc}
              </Text>
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

export default AllMyCourse;
