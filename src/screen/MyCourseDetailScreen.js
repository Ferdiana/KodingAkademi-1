import {Center, Image, ScrollView, Stack, Text} from 'native-base';
import React from 'react';
import Colors from '../theme/colors';
import {useRoute} from '@react-navigation/native';
import Data from '../data/Data';
import {Btn_Primary} from '../components';

const MyCourseDetailScreen = () => {
  const route = useRoute();
  const {id} = route.params;

  const MyCourse = Data.find(item => item.id === id);

  return (
    <Stack flex={1} bg={Colors.neutral[50]} px={'18px'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center w={'100%'} h={'324px'} my={'10px'}>
          <Image
            borderRadius={8}
            h={'100%'}
            w={'100%'}
            source={{uri: `${MyCourse.image}`}}
            alt="img_MyCourse"
          />
        </Center>
        <Stack space={'5px'}>
          <Text fontFamily={'Inter'} fontSize={'20px'} fontWeight={600}>
            {MyCourse.title}
          </Text>
          <Text fontFamily={'Inter'} fontSize={'16px'} fontWeight={500}>
            Until {''}
            {MyCourse.date}
          </Text>
          <Text fontFamily={'Inter'} fontSize={'14px'} fontWeight={500}>
            Description
          </Text>
          <Text
            fontFamily={'Inter'}
            fontSize={'12px'}
            fontWeight={300}
            textAlign={'justify'}>
            {MyCourse.desc}
          </Text>
          <Text fontFamily={'Inter'} fontSize={'14px'} fontWeight={500}>
            Requirements
          </Text>
          <Text
            fontFamily={'Inter'}
            fontSize={'12px'}
            fontWeight={300}
            textAlign={'justify'}>
            {MyCourse.desc}
          </Text>
        </Stack>
      </ScrollView>
      <Btn_Primary text={'Finished'} disabled={true} pb={'12px'} />
    </Stack>
  );
};

export default MyCourseDetailScreen;
