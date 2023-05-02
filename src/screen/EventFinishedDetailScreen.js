import React from 'react';
import {Stack, Text, Box, Image} from 'native-base';
import {useRoute} from '@react-navigation/native';
import {dataEvent} from '../data/DataEvent';

function EventFinishedDetailScreen() {
  const route = useRoute();
  const itemId = route.params.itemId;

  const item = dataEvent.find(item => item.id === itemId);

  return (
    <Stack flex={1} px={'18px'}>
      <Stack flex={1}>
        <Box h={'50%'} pb={'20px'}>
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

            <Box>
              <Text fontSize={14} fontWeight={'bold'}>
                Description
              </Text>
              <Text fontSize={12}>{item.description}</Text>
            </Box>
          </Stack>
        </Box>
      </Stack>
    </Stack>
  );
}

export default EventFinishedDetailScreen;
