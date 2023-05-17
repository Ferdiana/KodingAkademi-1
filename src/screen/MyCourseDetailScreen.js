import React, {useContext, useState, useEffect} from 'react';
import {Center, Image, ScrollView, Stack, Text} from 'native-base';
import Colors from '../theme/colors';
import {Btn_Primary} from '../components';
import {API_MyCourseDetail} from '../controller/API_MyCourse';
import {AuthContext} from '../controller/AuthContext';

const MyCourseDetailScreen = ({route}) => {
  const {user} = useContext(AuthContext);
  const [MyCourse, setMyCourseDetail] = useState({});

  useEffect(() => {
    const {id} = route.params;
    const loadMyCourseDetail = async () => {
      const response = await API_MyCourseDetail(id, user.accessToken);
      if (response) {
        setMyCourseDetail(response);
      }
      console.log(response);
    };

    loadMyCourseDetail();
  }, [route.params, user.accessToken]);

  return (
    <Stack flex={1} bg={Colors.neutral[50]} px={'18px'}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center w={'100%'} h={'324px'} my={'10px'}>
          <Image
            borderRadius={8}
            h={'100%'}
            w={'100%'}
            source={{uri: `${MyCourse.img}`}}
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
