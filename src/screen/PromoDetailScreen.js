import React, {useContext, useEffect, useState} from 'react';
import {Text, Stack, Center, Image, ScrollView} from 'native-base';
import axios from 'axios';
import {AuthContext} from '../controller/AuthContext';
import Colors from '../theme/colors';
import Btn_Primary from '../components/button/Btn_Primary';
import {StyleSheet} from 'react-native';
import HTMLContentView from 'react-native-htmlview';
import {API_DetailCourse} from '../controller/API_Course';
import {API_AddCart, API_GetCart} from '../controller/API_Cart';
import {API_MyCourse} from '../controller/API_MyCourse';

const PromoDetailScreen = ({route}) => {
  const {user} = useContext(AuthContext);
  const [courseDetail, setCourseDetail] = useState({});
  const [isInCart, setIsInCart] = useState(false);
  const [isInMyCourse, setIsInMyCourse] = useState(false);

  useEffect(() => {
    const {id} = route.params;
    const loadCourseDetail = async () => {
      const response = await API_DetailCourse(id, user.accessToken);
      if (response) {
        response.type = 'promo';
        setCourseDetail(response);
      }
    };
    const checkIfInCart = async () => {
      if (user.accessToken) {
        const cartItems = await API_GetCart(user.accessToken);
        const response = cartItems.cart_items.some(item => item.id === id);
        setIsInCart(response);
      }
    };
    const checkIfInMyCourse = async () => {
      if (user.accessToken) {
        const MyCourseItem = await API_MyCourse(user.accessToken);
        const response = MyCourseItem.some(item => item.id === id);
        setIsInMyCourse(response);
      }
    };

    loadCourseDetail();
    checkIfInCart();
    checkIfInMyCourse();
  }, [route.params, user.accessToken]);

  const handleAddToCart = async () => {
    try {
      await API_AddCart(user.accessToken, courseDetail.id);
      console.log('sukses');
    } catch (error) {
      console.error(error);
    }
  };

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
              courseDetail.price && courseDetail.discount_price
                ? courseDetail.discount_price.toLocaleString('id-ID')
                : ''
            }`}
          </Text>
          <Text
            fontFamily={'Inter'}
            fontWeight={500}
            fontSize={'14px'}
            strikeThrough={true}
            color={Colors.neutral[500]}>
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
      <Btn_Primary
        onPress={handleAddToCart}
        text={'Add to cart'}
        padding={'18px'}
        pb={'8px'}
        disabled={isInCart || isInMyCourse}
      />
    </Stack>
  );
};

const styles = StyleSheet.create({
  p: {
    textAlign: 'justify',
    lineHeight: 18,
  },
});
export default PromoDetailScreen;
