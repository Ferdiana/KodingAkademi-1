import React from 'react';
import {Image, Text, Stack, HStack, View, Pressable, Box} from 'native-base';
import {SectionGrid} from 'react-native-super-grid';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../theme/colors';
import {dataEvent} from '../../data/DataEvent';

export default function AllEvent({searchText}) {
  const navigation = useNavigation();

  const handleClick = id => {
    const selectedEvent = dataEvent.find(item => item.id === id);
    if (selectedEvent.category === 'successful') {
      navigation.navigate('EventFinishedDetail', {itemId: id});
    } else {
      navigation.navigate('EventFreeDetail', {itemId: id});
    }
  };

  const filteredData = dataEvent.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const sections = [
    {
      title: 'Upcoming Events',
      data: filteredData.filter(item => item.category === 'Upcoming'),
    },
    {
      title: 'Successful Events',
      data: filteredData.filter(item => item.category === 'Successful'),
    },
  ];

  const numResults = filteredData.length;
  const showSectionHeader = searchText;

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
                  {item.dateLeft}
                  {item.status}
                </Text>
                <Text
                  fontFamily={'Inter'}
                  fontSize={'12px'}
                  fontWeight={600}
                  color={Colors.primary[500]}>
                  {item.quota ? `Quota: ${item.quota}` : ''}
                </Text>
              </HStack>
            </Stack>
          </HStack>
        </Stack>
      </Pressable>
    );
  };

  const renderSectionHeader = ({section}) => {
    if (showSectionHeader) {
      return null;
    }
    return (
      <View px={'18px'}>
        <Text fontFamily={'Inter'} fontSize={'14px'} fontWeight={'600'}>
          {section.title}
        </Text>
        {section.title === 'Upcoming Events' && (
          <Text fontFamily={'Inter'} fontWeight={400} fontSize={'12px'}>
            Stay tuned for our exciting lineup of upcoming events
          </Text>
        )}
      </View>
    );
  };

  return (
    <Stack flex={1}>
      {searchText && (
        <Stack px={'18px'}>
          <Text fontSize={14} fontWeight={'900'}>
            Search results for{' '}
            <Text color={Colors.primary[500]}>"{searchText}"</Text> in event
          </Text>
          <Text>
            {numResults} {numResults > 1 ? 'results' : 'result'} found
          </Text>
        </Stack>
      )}
      <SectionGrid
        itemDimension={400}
        spacing={0}
        sections={sections}
        dataEvent={dataEvent}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
      />
    </Stack>
  );
}
