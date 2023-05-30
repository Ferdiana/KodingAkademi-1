import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  Stack,
  Center,
  Image,
  ScrollView,
  HStack,
  Pressable,
  ZStack,
  Spinner,
  Alert,
} from 'native-base';
import {AuthContext} from '../controller/AuthContext';
import Colors from '../theme/colors';
import Btn_Primary from '../components/button/Btn_Primary';
import {StyleSheet} from 'react-native';
import HTMLContentView from 'react-native-htmlview';
import {API_DetailCourse} from '../controller/API_Course';
import {API_AddCart, API_GetCart} from '../controller/API_Cart';
import {API_MyCourse} from '../controller/API_MyCourse';
import Icon from 'react-native-vector-icons/Feather';
import {API_Transaction} from '../controller/API_Transaction';

const CourseDetailScreen = ({route, navigation}) => {
  const {user} = useContext(AuthContext);
  const [courseDetail, setCourseDetail] = useState({});
  const [isInCart, setIsInCart] = useState(false);
  const [isInMyCourse, setIsInMyCourse] = useState(false);
  const [refreshPage, setRefreshPage] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [isInOrder, setIsInOrder] = useState(false);

  useEffect(() => {
    const {id} = route.params;
    const loadData = async () => {
      setIsLoading(true);
      const courseDetailResponse = await API_DetailCourse(id, user.accessToken);
      setCourseDetail(courseDetailResponse);
      if (user.accessToken) {
        const cartItems = await API_GetCart(user.accessToken);
        setIsInCart(cartItems.cart_items.some(item => item.id === id));
        const myCourseItems = await API_MyCourse(user.accessToken);
        setIsInMyCourse(myCourseItems.some(item => item.id === id));
        // const orderId = await API_Transaction(user.accessToken);
        // setIsInOrder(
        //   orderId.some(item =>
        //     item.order.some(
        //       orderItem =>
        //         orderItem.product_id === id &&
        //         orderItem.order_status === 'pending',
        //     ),
        //   ),
        // );
        const count = cartItems.cart_items.length;
        setCartItemCount(count);
        if (isInCart || isInMyCourse || isInOrder) {
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 3000);
        }
      }
      setIsLoading(false);
    };
    loadData();
  }, [
    route.params,
    user.accessToken,
    refreshPage,
    isInCart,
    isInMyCourse,
    isInOrder,
  ]);

  const handleAddToCart = async id => {
    try {
      await API_AddCart(user.accessToken, courseDetail.id);
      console.log('sukses');
      setRefreshPage(!refreshPage);
    } catch (error) {
      console.error(error.message);
    }
  };

  React.useEffect(() => {
    const focusHandler = navigation.addListener('focus', () => {
      setRefreshPage(!refreshPage);
    });
    return focusHandler;
  }, [navigation, refreshPage]);

  if (isLoading) {
    return (
      <Stack flex={1} justifyContent="center" alignItems="center">
        <Spinner
          accessibilityLabel="Loading posts"
          size="large"
          color={Colors.secondary[500]}
        />
      </Stack>
    );
  }

  const textAlert = () => {
    if (isInCart) {
      return <Text>Product is already in Cart</Text>;
    } else if (isInMyCourse) {
      return <Text>Product is in My Course</Text>;
    } else if (isInOrder) {
      return <Text>Product is in Order</Text>;
    } else {
      return null;
    }
  };

  return (
    <Stack bg={Colors.neutral[50]} flex={1}>
      {showAlert && (
        <Alert
          status="info"
          variant={'left-accent'}
          mx={'18px'}
          mb={1}
          alignItems={'flex-start'}
          borderRadius={8}>
          <HStack space={'12px'}>
            <Alert.Icon />
            <Text fontFamily={'Inter'} fontSize={'12px'}>
              {textAlert()}
            </Text>
          </HStack>
        </Alert>
      )}
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
          <Stack>
            {courseDetail.discount_price ? (
              <>
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
              </>
            ) : (
              <Text
                fontFamily={'Inter'}
                fontWeight={500}
                fontSize={'16px'}>{`Rp${
                courseDetail.price
                  ? courseDetail.price.toLocaleString('id-ID')
                  : ''
              }`}</Text>
            )}
          </Stack>
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
      <HStack
        px={'18px'}
        py={'8px'}
        alignItems={'center'}
        space={'8px'}
        justifyContent={'space-between'}>
        <Pressable onPress={() => navigation.navigate('Cart')}>
          <Stack
            w={'46px'}
            h={'46px'}
            alignItems={'center'}
            justifyContent={'center'}>
            <Icon name="shopping-cart" color={Colors.neutral[900]} size={28} />
            {cartItemCount > 0 && (
              <ZStack
                position="absolute"
                top={'0'}
                right={'0'}
                bg="primary.500"
                alignItems="center"
                borderRadius={100}
                width={'18px'}
                height={'18px'}>
                <Text
                  fontFamily={'Inter'}
                  color="white"
                  fontSize={12}
                  fontWeight="semibold">
                  {cartItemCount}
                </Text>
              </ZStack>
            )}
          </Stack>
        </Pressable>
        <Stack w={'82%'}>
          <Btn_Primary
            w={'100%'}
            onPress={handleAddToCart}
            text={'Add to cart'}
            disabled={isInMyCourse || isInCart || isInOrder}
          />
        </Stack>
      </HStack>
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
