import React, {useContext, useEffect, useState} from 'react';
import {Text, Stack, Center, Image, ScrollView} from 'native-base';
import {AuthContext} from '../controller/AuthContext';
import Colors from '../theme/colors';
import Btn_Primary from '../components/button/Btn_Primary';
import {StyleSheet} from 'react-native';
import HTMLContentView from 'react-native-htmlview';
import {API_DetailCourse} from '../controller/API_Course';

const CourseDetailScreen = ({route, maxLines}) => {
  const {user} = useContext(AuthContext);
  const [courseDetail, setCourseDetail] = useState({});

  useEffect(() => {
    const {id} = route.params;
    const loadCourseDetail = async () => {
      const response = await API_DetailCourse(id, user.accessToken);
      if (response) {
        setCourseDetail(response);
      }
    };

    loadCourseDetail();
  }, [route.params, user.accessToken]);

  return (
    <Stack bg={Colors.neutral[50]} flex={1}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Center w={'full'} h={'324px'} px={'18px'} py={'10px'}>
          <Image
            borderRadius={8}
            source={{uri: courseDetail.img_url}}
            alt="img_product"
            h={'100%'}
            width={'100%'}
          />
        </Center>
        <Stack px={'18px'}>
          <Text fontFamily={'Inter'} fontWeight={600} fontSize={'20px'}>
            {courseDetail.name}
          </Text>
          <Text fontFamily={'Inter'} fontWeight={500} fontSize={'16px'}>
            {`Rp${
              courseDetail.price
                ? courseDetail.price.toLocaleString('id-ID')
                : ''
            }`}
          </Text>
          <Text
            fontFamily={'Inter'}
            fontWeight={500}
            fontSize={'14px'}
            mt={'5px'}>
            Description
          </Text>
          <HTMLContentView
            value={courseDetail.description}
            stylesheet={styles}
          />
        </Stack>
      </ScrollView>
      <Btn_Primary text={'Add to cart'} padding={'18px'} pb={'8px'} />
    </Stack>
  );
};

const styles = StyleSheet.create({
  p: {
    textAlign: 'justify',
    lineHeight: 18,
  },
  ul: {
    textAlign: 'justify',
  },
  li: {
    textAlign: 'justify',
  },
});

export default CourseDetailScreen;
