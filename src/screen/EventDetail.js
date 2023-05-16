import React, {useContext, useEffect, useState} from 'react';
import {Text, Stack, Center, Image, ScrollView} from 'native-base';
import {AuthContext} from '../controller/AuthContext';
import Colors from '../theme/colors';
import Btn_Primary from '../components/button/Btn_Primary';
import {StyleSheet} from 'react-native';
import HTMLContentView from 'react-native-htmlview';
import {Dropdown} from 'react-native-element-dropdown';
import {API_DetailEvents} from '../controller/API_Events';

const EventDetailScreen = ({route}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const {user} = useContext(AuthContext);
  const [eventDetail, setEventDetail] = useState({});
  const [dropdownOption, setDropdownOption] = useState([]);

  useEffect(() => {
    const {id} = route.params;
    const loadEventsDetail = async () => {
      const response = await API_DetailEvents(id, user.accessToken);
      if (response) {
        setEventDetail(response);
        setDropdownOption(response.event_dates);
      }
    };

    loadEventsDetail();
  }, [route.params, user.accessToken]);
  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const convertedOptions = dropdownOption.map(option => {
    const formattedDate = formatDate(option.date);
    return {date: formattedDate};
  });

  return (
    <Stack bg={Colors.neutral[50]} flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center w={'full'} h={'324px'} px={'18px'} py={'10px'}>
          <Image
            borderRadius={8}
            source={{uri: eventDetail.img_url}}
            alt="img_product"
            h={'100%'}
            width={'100%'}
          />
        </Center>
        <Stack px={'18px'}>
          <Text fontFamily={'Inter'} fontWeight={600} fontSize={'20px'}>
            {eventDetail.name}
          </Text>
          <Text fontFamily={'Inter'} fontWeight={500} fontSize={'16px'}>
            {eventDetail.price
              ? `Rp${eventDetail.price.toLocaleString('id-ID')}`
              : 'FREE'}
          </Text>
          <Text
            fontFamily={'Inter'}
            fontWeight={500}
            fontSize={'14px'}
            mt={'5px'}>
            Description
          </Text>
          <HTMLContentView
            value={eventDetail.description}
            stylesheet={styles}
          />
          <Text
            fontFamily={'Inter'}
            fontWeight={500}
            fontSize={'14px'}
            mt={'5px'}>
            Remaining quota
          </Text>
          <Text fontFamily={'Inter'} fontWeight={400} fontSize={'12px'}>
            {eventDetail.participants}/{eventDetail.quota} Participants
          </Text>
          <Stack space={'5px'} mb={'80px'}>
            <Text fontFamily={'Inter'} fontSize={'14px'} fontWeight={500}>
              Choose Event Date
            </Text>
            <Dropdown
              style={styles.Dropdown}
              fontFamily="Inter"
              data={convertedOptions}
              valueField="date"
              labelField={'date'}
              placeholder={'Select an option'}
              value={selectedValue}
              onChange={itemValue => setSelectedValue(itemValue)}
            />
          </Stack>
        </Stack>
      </ScrollView>
      <Btn_Primary text={'Add to cart'} padding={'18px'} pb={'8px'} />
    </Stack>
  );
};

const styles = StyleSheet.create({
  Dropdown: {
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  p: {
    textAlign: 'justify',
    lineHeight: 18,
    fontSize: 12,
  },
  ul: {
    textAlign: 'justify',
  },
  li: {
    textAlign: 'justify',
  },
});

export default EventDetailScreen;
