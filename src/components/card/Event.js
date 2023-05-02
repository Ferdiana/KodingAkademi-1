import React from 'react';
import {TouchableOpacity} from 'react-native';
import {
  NativeBaseProvider,
  Image,
  Text,
  Stack,
  HStack,
  Input,
  View,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {SectionGrid} from 'react-native-super-grid';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import Colors from '../../theme/colors';
import {dataEvent} from '../../data/DataEvent';

export default function Event({searchText}) {
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
      data: filteredData.filter(item => item.category === 'upcoming'),
    },
    {
      title: 'Successful Events',
      data: filteredData.filter(item => item.category === 'successful'),
    },
  ];

  const numResults = filteredData.length;
  const showSectionHeader = searchText;

  return (
    <NativeBaseProvider>
      {searchText && (
        <View px={'10px'}>
          <Text fontSize={14} fontWeight={'900'}>
            Search results for{' '}
            <Text color={Colors.primary[500]}>"{searchText}"</Text> in event
          </Text>
          <Text>
            {numResults} {numResults > 1 ? 'results' : 'result'} found
          </Text>
        </View>
      )}
      <SectionGrid
        itemDimension={200}
        spacing={8}
        sections={sections}
        dataEvent={dataEvent}
        keyExtractor={item => item.id}
        renderItem={({item, section, index}) => (
          <TouchableOpacity onPress={() => handleClick(item.id)}>
            <HStack
              borderWidth={2}
              p={'8px'}
              borderRadius={10}
              borderColor={Colors.primary[500]}>
              <Image
                source={{uri: item.image}}
                w={'35%'}
                h={'full'}
                alt={'image'}
                borderRadius={10}
              />
              <Stack w={'65%'} pl={2}>
                <Text fontWeight={'bold'} fontSize={'12px'}>
                  {item.title}
                </Text>
                <Text fontWeight={'bold'} fontSize={'10px'}>
                  {item.date}
                </Text>
                <Text h={'40px'} textAlign={'justify'} fontSize={'10px'}>
                  {item.description}
                </Text>

                <HStack justifyContent={'space-between'}>
                  <Text
                    fontSize={'12px'}
                    fontWeight={'bold'}
                    color={Colors.primary[500]}>
                    {item.dateLeft}
                    {item.status}
                  </Text>
                  <Text
                    fontSize={'12px'}
                    fontWeight={'bold'}
                    color={Colors.primary[500]}>
                    {item.quota ? `Quota: ${item.quota}` : ''}
                  </Text>
                </HStack>
              </Stack>
            </HStack>
          </TouchableOpacity>
        )}
        renderSectionHeader={({section}) => {
          if (showSectionHeader) {
            return null;
          }
          return (
            <View>
              <Text
                fontSize={14}
                fontWeight={'900'}
                alignItems={'center'}
                px={'10px'}>
                {section.title}
              </Text>

              {section.title === 'Upcoming Events' && (
                <Text px={'10px'} fontSize={14}>
                  Stay tuned for our exciting lineup of upcoming events
                </Text>
              )}
            </View>
          );
        }}
      />
    </NativeBaseProvider>
  );
}
