/* eslint-disable no-unused-vars */
import React, {useState, useContext, useEffect} from 'react';
import {
  Image,
  Text,
  Stack,
  HStack,
  View,
  Pressable,
  Box,
  FlatList,
} from 'native-base';
import HTMLContentView from 'react-native-htmlview';
import {SectionGrid} from 'react-native-super-grid';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../theme/colors';
import {AuthContext} from '../../controller/AuthContext';
import {API_Events} from '../../controller/API_Events';
import formatDate from '../../controller/formatDate';

export default function AllEvent({searchText}) {
  const [events, setEvents] = useState([]);
  const [eventDate, setEventDate] = useState([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const loadEvents = async () => {
      if (user.accessToken) {
        const response = await API_Events(user.accessToken);
        const eventDates = response.flatMap(event => event.event_dates);
        const sortedEvents = response.sort((a, b) => {
          const dateA = new Date(a.event_dates[0].date);
          const dateB = new Date(b.event_dates[0].date);
          return dateB - dateA;
        });
        setEvents(sortedEvents);
        setEventDate(eventDates);
      }
    };
    loadEvents();
  }, [user.accessToken]);

  const handlePress = id => {
    navigation.navigate('EventDetail', {id});
  };

  const convertedOptions = eventDate.map(option => {
    const formattedDate = formatDate(option.date);
    return {date: formattedDate};
  });

  const currentDate = new Date();

  const isDatePassed = dateString => {
    const date = new Date(dateString);
    return date < currentDate;
  };

  const renderTextStatus = dates => {
    const hasUpcomingEvent = dates.some(
      date => new Date(date.date) > currentDate,
    );
    return hasUpcomingEvent ? 'Upcoming' : 'Finished';
  };

  const filteredData = events.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const renderItem = ({item}) => {
    const statusText = renderTextStatus(item.event_dates);
    return (
      <Pressable my={'5px'} onPress={() => handlePress(item.id)}>
        <Stack
          borderWidth={1}
          borderColor={Colors.neutral[300]}
          w={'100%'}
          p={'8px'}
          borderRadius={10}
          mr={2}>
          <HStack h={'103px'} space={'5px'} pr={'8px'}>
            <Image
              source={{uri: `${item.img_url}`}}
              alt={'img'}
              w={'35%'}
              h={'100%'}
              resizeMode="center"
              borderRadius={10}
            />
            <Stack w={'65%'} justifyContent={'space-between'}>
              <Text
                numberOfLines={1}
                letterSpacing={'0.5px'}
                fontFamily={'Inter'}
                fontSize={'14px'}
                fontWeight={600}
                color={Colors.neutral[900]}>
                {item.name}
              </Text>
              <Text
                color={Colors.neutral[900]}
                fontFamily={'Inter'}
                fontSize={'10px'}
                fontWeight={400}>
                {(() => {
                  const eventDates = item.event_dates.map(eventDate =>
                    formatDate(eventDate.date),
                  );
                  const uniqueDates = [...new Set(eventDates)]; // Menghapus tanggal yang duplikat
                  const filteredDates = uniqueDates.filter(date =>
                    convertedOptions.some(option => option.date === date),
                  );
                  if (filteredDates.length > 1) {
                    const startDate = filteredDates[0];
                    const endDate = filteredDates[filteredDates.length - 1];
                    return `${startDate} - ${endDate}`;
                  } else {
                    return filteredDates[0];
                  }
                })()}
              </Text>
              <Stack h={'54px'} overflow={'hidden'} my={-1}>
                <HTMLContentView
                  value={item.description}
                  stylesheet={{
                    p: {textAlign: 'justify', color: Colors.neutral[900]},
                  }}
                />
              </Stack>
              <HStack justifyContent={'space-between'}>
                <Text
                  color={Colors.primary[500]}
                  fontFamily={'Inter'}
                  fontSize={'12px'}
                  fontWeight={600}>
                  {statusText}
                </Text>
                <Text
                  color={Colors.primary[500]}
                  fontFamily={'Inter'}
                  fontSize={'12px'}
                  fontWeight={600}>
                  quota: {item.participants}/{item.quota}
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
      pt={'5px'}
      px={'18px'}
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
}
