import React from 'react';
import {Stack, Text, Box, Image, HStack, Select, ScrollView} from 'native-base';
import {useRoute} from '@react-navigation/native';
import {dataEvent} from '../data/DataEvent';
import {Btn_Primary} from '../components';

function EventFreeDetailScreen() {
  const route = useRoute();
  const itemId = route.params.itemId;

  const item = dataEvent.find(item => item.id === itemId);

  return (
    <Stack flex={1} px={'18px'}>
      <ScrollView>
        <Stack flex={1}>
          <Box h={'324'} pb={'20px'}>
            <Image
              source={{uri: item.image}}
              w={'full'}
              h={'full'}
              borderRadius={8}
              alt={'image'}
            />
          </Box>
          <Box>
            <Stack space={'5px'}>
              <Text fontSize={20} fontWeight={'bold'}>
                {item.title}
              </Text>
              <Text fontSize={14} fontWeight={'bold'}>
                {item.price}
              </Text>
              <Text fontSize={14} fontWeight={'bold'}>
                Description
              </Text>
              <Text fontSize={12}>{item.description}</Text>
              <HStack>
                <Box w={'50%'} pr={'10px'} mr={'10px'}>
                  <Text fontSize={14} fontWeight={'bold'}>
                    Requirement
                  </Text>
                  <Text fontSize={12}>{item.description}</Text>
                </Box>
                <Box>
                  <Text fontSize={14} fontWeight={'bold'}>
                    Remaining Quota
                  </Text>
                  <Text fontSize={12} textAlign={'justify'}>
                    {item.quota} participants
                  </Text>
                </Box>
              </HStack>
              <Box>
                <Text fontSize={14} fontWeight={'bold'}>
                  Choose Event Date
                </Text>
                <Select
                  minWidth="200"
                  accessibilityLabel="Choose Service"
                  placeholder="Choose Service"
                  mb={10}>
                  <Select.Item label="Friday, 10 March 2023" value=" " />
                  <Select.Item label="Friday, 11 March 2023" value=" " />
                </Select>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </ScrollView>
      <Box h={10} mb={'18px'} justifyContent="flex-end">
        <Btn_Primary text={'Register For Free'} />
      </Box>
    </Stack>
  );
}

export default EventFreeDetailScreen;
