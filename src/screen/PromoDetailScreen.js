import React from 'react';
import {Stack, Text, Box, Image, HStack} from 'native-base';
import {useRoute} from '@react-navigation/native';
import {Btn_Primary, Btn_Secondary} from '../components';
import {dataCourse} from '../data/DataCourse';

function PromoDetailScreen() {
  const route = useRoute();
  const itemId = route.params.itemId;

  const item = dataCourse.find(item => item.id === itemId);

  return (
    <Stack maxH={'100%'} h={'100%'} px={0}>
      <Image
        source={{uri: `${item.image}`}}
        w={'full'}
        h={'40%'}
        alt={'image'}
      />
      <Box m={2}>
        <Text fontSize={20} fontWeight={'bold'}>
          {item.title}
        </Text>
        <Box my={'1%'}>
          <Text
            fontSize={14}
            fontWeight={'bold'}
            textDecorationLine={'line-through'}
            color={'neutral.300'}>
            {item.priceOld}
          </Text>
          <Text fontSize={14} fontWeight={'bold'}>
            {item.priceNew}
          </Text>
        </Box>
        <Text my={'1%'} fontSize={14} fontWeight={'bold'}>
          Description
        </Text>
        <Text fontSize={12}>{item.description}</Text>
      </Box>

      <HStack h={10}>
        <Btn_Primary text={'Take this course'} padding={2} />
        <Btn_Secondary
          textcolor={'primary.500'}
          text={'Take this course'}
          padding={2}
        />
      </HStack>
    </Stack>
  );
}

export default PromoDetailScreen;
