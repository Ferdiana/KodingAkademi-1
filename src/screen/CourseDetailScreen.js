import React, {useContext, useEffect, useState} from 'react';
import {Text, Stack, Center, Image, ScrollView} from 'native-base';
import axios from 'axios';
import {AuthContext} from '../controller/AuthContext';
import Colors from '../theme/colors';
import RenderHTML from 'react-native-render-html';
import Btn_Primary from '../components/button/Btn_Primary';
import {useWindowDimensions} from 'react-native';

const CourseDetailScreen = ({route}) => {
  const {user} = useContext(AuthContext);
  const [courseDetail, setCourseDetail] = useState({});

  useEffect(() => {
    const {id} = route.params;
    const loadCourseDetail = async () => {
      try {
        const response = await axios.get(
          `https://2358-103-157-49-64.ngrok-free.app/user/courses/${id}`,
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          },
        ); // panggil endpoint detail course
        setCourseDetail(response.data.data); // simpan data ke state
      } catch (error) {
        console.error(error.response.data);
      }
    };

    loadCourseDetail(); // panggil fungsi untuk memuat detail course
  }, [route.params, user.accessToken]); // tambahkan 'route.params' ke dalam dependency array

  const {width} = useWindowDimensions();
  return (
    <Stack bg={Colors.neutral[50]} flex={1}>
      <ScrollView>
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
            mt={'5px'}
            mb={'-8px'}>
            Description
          </Text>
          {courseDetail.description && (
            <RenderHTML
              source={{html: courseDetail.description}}
              contentWidth={width}
              enableExperimentalMarginCollapsing={true}
              tagsStyles={{
                body: {color: Colors.neutral[900]},
                p: {
                  fontFamily: 'Inter',
                  textAlign: 'justify',
                  lineHeight: 18,
                  fontWeight: '100',
                },
                ul: {marginTop: -16},
                li: {paddingVertical: 4},
              }}
            />
          )}
        </Stack>
      </ScrollView>
      <Btn_Primary text={'Add to cart'} padding={'18px'} pb={'8px'} />
    </Stack>
  );
};

export default CourseDetailScreen;
