/* eslint-disable react-native/no-inline-styles */
import {Box, Center, HStack, Image, ScrollView, Stack, Text} from 'native-base';
import React, {useState} from 'react';
import Colors from '../theme/colors';
import {useRoute} from '@react-navigation/native';
import {dataEvent} from '../data/DataEvent';
import {Dropdown} from 'react-native-element-dropdown';
import {Btn_Primary} from '../components';

const AttendedEventDetailScreen = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const route = useRoute();
  const {id} = route.params;

  const AttendedEvent = dataEvent.find(item => item.id === id);
  const options = [
    {label: 'Option 1', value: 1},
    {label: 'Option 2', value: 2},
    {label: 'Option 3', value: 3},
    {label: 'Option 4', value: 4},
  ];

  return (
    <Stack bg={Colors.neutral[50]} flex={1} px={'18px'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center w={'full'} h={'324px'} my={'10px'}>
          <Image
            borderRadius={8}
            source={{uri: AttendedEvent.image}}
            alt="img_event"
            h={'100%'}
            width={'100%'}
          />
        </Center>
        <Stack space={'5px'} py={'10px'}>
          <Text fontFamily={'Inter'} fontSize={'20px'} fontWeight={600}>
            {AttendedEvent.title}
          </Text>
          <Text fontFamily={'Inter'} fontSize={'16px'} fontWeight={500}>
            {AttendedEvent.price}
          </Text>
          <Text fontFamily={'Inter'} fontSize={'14px'} fontWeight={500}>
            Description
          </Text>
          <Text
            fontFamily={'Inter'}
            fontSize={'12px'}
            fontWeight={300}
            textAlign={'justify'}>
            {AttendedEvent.description}
          </Text>
          <HStack>
            <Box w={'50%'} pr={'10px'} mr={'10px'}>
              <Text fontFamily={'Inter'} fontSize={'14px'} fontWeight={500}>
                Requirement
              </Text>
              <Text
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={300}
                textAlign={'justify'}>
                {AttendedEvent.description}
              </Text>
            </Box>
            <Box>
              <Text fontFamily={'Inter'} fontSize={'14px'} fontWeight={500}>
                Remaining Quota
              </Text>
              <Text
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={300}
                textAlign={'justify'}>
                {AttendedEvent.quota} participants
              </Text>
            </Box>
          </HStack>
          <Stack space={'5px'} mb={'80px'}>
            <Text fontFamily={'Inter'} fontSize={'14px'} fontWeight={500}>
              Choose Event Date
            </Text>
            <Dropdown
              style={{
                borderWidth: 1,
                borderColor: Colors.neutral[300],
                borderRadius: 8,
                paddingVertical: 4,
                paddingHorizontal: 12,
              }}
              fontFamily="Inter"
              disable
              data={options}
              valueField="value"
              placeholder={'Select an options'}
              labelField={'label'}
              value={selectedValue}
              onChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
            />
          </Stack>
        </Stack>
      </ScrollView>
      <Btn_Primary text={'Add to cart'} pb={'8px'} disabled={true} />
    </Stack>
  );
};
export default AttendedEventDetailScreen;
