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
import Colors from '../../theme/colors';
import {dataEvent} from '../../data/DataEvent';

const AttendedEvent = ({searchText, selectedCategory}) => {
  const navigation = useNavigation();

  const handleClick = id => {
    navigation.navigate('AttendedEventDetail', {id});
  };

  const filteredData = dataEvent
    .filter(item =>
      selectedCategory ? item.category === selectedCategory : true,
    )
    .filter(item =>
      searchText
        ? item.title.toLowerCase().includes(searchText.toLowerCase())
        : true,
    );

  // const filteredData = dataEvent.filter(item =>
  //   item.title.toLowerCase().includes(searchText.toLowerCase()),
  // );

  const renderItem = ({item}) => {
    return (
      <Pressable onPress={() => handleClick(item.id)} my={'5px'} px={'18px'}>
        <Stack
          w={'100%'}
          borderRadius={8}
          space={'8px'}
          shadow={1}
          bg={Colors.neutral[50]}>
          <HStack h={'103px'} space={'8px'} p={'8px'}>
            <Box w={'40%'}>
              <Image
                borderRadius={8}
                h={'100%'}
                w={'100%'}
                source={{uri: `${item.image}`}}
                alt="image_article"
              />
            </Box>
            <Stack w={'60%'} justifyContent={'space-evenly'} pr={'8px'}>
              <Text
                numberOfLines={2}
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={600}
                color={Colors.neutral[900]}>
                {item.title}
              </Text>
              <Text
                numberOfLines={2}
                fontFamily={'Inter'}
                fontSize={'10px'}
                fontWeight={500}
                color={Colors.neutral[900]}>
                {item.date}
              </Text>
              <Text
                numberOfLines={2}
                fontFamily={'Inter'}
                fontSize={'10px'}
                fontWeight={300}
                textAlign={'justify'}
                color={Colors.neutral[900]}>
                {item.description}
              </Text>
              <HStack justifyContent={'space-between'} pr={'8px'}>
                <Text
                  fontFamily={'Inter'}
                  fontSize={'12px'}
                  fontWeight={600}
                  color={Colors.primary[500]}>
                  {item.status}
                  {item.register}
                </Text>
              </HStack>
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

export default AttendedEvent;
