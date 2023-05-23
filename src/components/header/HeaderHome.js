import React, {useContext, useEffect, useState} from 'react';
import {Text, HStack, VStack, Pressable, ZStack} from 'native-base';
import Icon from 'react-native-vector-icons/Feather';
import QRComponent from '../QR/QRComponent';
import {AuthContext} from '../../controller/AuthContext';
import {ImageBackground} from 'react-native';
import {API_MyCourse} from '../../controller/API_MyCourse';
import Colors from '../../theme/colors';
import {API_GetCart} from '../../controller/API_Cart';

const HeaderHome = ({navigation, refreshing, onRefresh}) => {
  const {user} = useContext(AuthContext);
  const [myCourse, setMyCourse] = useState([]);
  const [expiredDate, setExpiredDate] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const loadMyCourse = async () => {
      if (user.accessToken) {
        const response = await API_MyCourse(user.accessToken);
        setMyCourse(response);
      }
    };
    loadMyCourse();
  }, [user.accessToken]);

  useEffect(() => {
    const loadCart = async () => {
      if (user.accessToken) {
        const coursesData = await API_GetCart(user.accessToken);
        const count = coursesData.cart_items.length;
        setCartItemCount(count);
      }
    };
    loadCart();
  }, [user.accessToken]);

  useEffect(() => {
    if (myCourse.length > 0) {
      let newestDate = new Date(myCourse[0].expired_date);
      for (let i = 1; i < myCourse.length; i++) {
        const currentDate = new Date(myCourse[i].expired_date);
        if (currentDate > newestDate) {
          newestDate = currentDate;
        }
      }
      setExpiredDate(newestDate);
    }
  }, [myCourse]);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const expired_date = formatDate(expiredDate);

  return (
    <VStack>
      <ImageBackground
        source={require('../../assets/image/bg.png')}
        resizeMode="cover">
        <VStack px={'5%'} pt={'8px'}>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <VStack>
              <Text color={'neutral.50'} fontSize={'18px'} fontWeight={700}>
                Hello, {user.full_name}
              </Text>
              <Text color={'neutral.50'} fontSize={'14px'}>
                What do you want to learn?
              </Text>
            </VStack>
            <Pressable onPress={() => navigation.navigate('Cart')}>
              <Icon name="shopping-cart" color={Colors.neutral[50]} size={24} />
              {cartItemCount > 0 && (
                <ZStack
                  position="absolute"
                  top={'-8px'}
                  right={'-8px'}
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
            </Pressable>
          </HStack>
          <Pressable onPress={() => navigation.navigate('QRDetail')}>
            <HStack
              my={'12px'}
              bg={'neutral.50'}
              px={5}
              py={2}
              borderRadius={10}
              space={4}
              alignItems={'center'}>
              <QRComponent size={80} />
              <VStack space={1}>
                <Text fontFamily={'Inter'} fontSize={'14px'}>
                  Status: {''}
                  <Text
                    color={
                      expiredDate && expiredDate < new Date()
                        ? 'red.500'
                        : 'primary.500'
                    }>
                    {expiredDate && expiredDate < new Date()
                      ? 'Expired'
                      : 'Active'}
                  </Text>
                </Text>
                <Text fontFamily={'Inter'} fontSize={'12px'}>
                  Expired Date: {expired_date}
                </Text>
              </VStack>
            </HStack>
          </Pressable>
        </VStack>
      </ImageBackground>
    </VStack>
  );
};
export default HeaderHome;
