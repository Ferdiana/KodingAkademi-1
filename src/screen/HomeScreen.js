/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {Text, HStack, VStack, Stack, Pressable, ZStack} from 'native-base';
import {
  Article,
  BannerSlider,
  MyCourse,
  Promo,
  QRComponent,
} from '../components';
import {ImageBackground, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../theme/colors';
import {useState} from 'react';
import {API_GetCart} from '../controller/API_Cart';
import {useContext} from 'react';
import {AuthContext} from '../controller/AuthContext';
import {useEffect} from 'react';
import {API_MyCourse} from '../controller/API_MyCourse';
import {useIsFocused} from '@react-navigation/native';

function HomeScreen({navigation}) {
  const {user} = useContext(AuthContext);
  const [myCourse, setMyCourse] = useState([]);
  const [expiredDate, setExpiredDate] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [refreshPage, setRefreshPage] = useState(false);

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

  const Title = ({text1, color1, text2, color2, onPress}) => {
    return (
      <Stack px={5} mb={'10px'}>
        <HStack justifyContent={'space-between'} alignItems={'center'}>
          <Text
            color={color1}
            fontFamily={'Inter'}
            fontWeight={600}
            fontSize={'14px'}>
            {text1}
          </Text>
          <Pressable onPress={onPress}>
            <Text
              color={'primary.500'}
              underline
              fontFamily={'Inter'}
              fontWeight={600}
              fontSize={'12px'}>
              See all
            </Text>
          </Pressable>
        </HStack>
        <Text
          color={color2}
          fontFamily={'Inter'}
          fontWeight={500}
          fontSize={'12px'}>
          {text2}
        </Text>
      </Stack>
    );
  };
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack>
        <ImageBackground
          source={require('../assets/image/bg.png')}
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
                <Icon
                  name="shopping-cart"
                  color={Colors.neutral[50]}
                  size={24}
                />
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
      <Stack space={1}>
        <VStack py={'10px'} bg={Colors.neutral[50]}>
          <Title
            onPress={() => navigation.navigate('MyCourse')}
            text1={'My Course'}
            color1={Colors.neutral[900]}
            text2={'List of courses I am currently taking or have completed.'}
            color2={Colors.neutral[700]}
          />
          <ScrollView
            px={'10px'}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <MyCourse mr={'18px'} />
          </ScrollView>
        </VStack>
        <Stack py={'10px'} bg={Colors.neutral[50]}>
          <ImageBackground
            source={require('../assets/image/bg.png')}
            resizeMode="cover">
            <VStack py={'10px'}>
              <Title
                onPress={() => navigation.navigate('Event')}
                text1={'Latest Events'}
                color1={Colors.neutral[50]}
                text2={'Check out exciting and interesting events for you!'}
                color2={Colors.neutral[50]}
              />
              <BannerSlider />
            </VStack>
          </ImageBackground>
        </Stack>
        <VStack py={'10px'} bg={Colors.neutral[50]}>
          <Title
            onPress={() => navigation.navigate('Article')}
            text1={'Article'}
            color1={Colors.neutral[900]}
            text2={"Let's read the article to increase your knowledge!"}
            color2={Colors.neutral[700]}
          />
          <ScrollView
            px={'10px'}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <Article mr={'18px'} />
          </ScrollView>
        </VStack>
        <VStack py={'10px'} bg={Colors.secondary[300]}>
          <Title
            onPress={() => navigation.navigate('Promo')}
            text1={'Course Promo'}
            color1={Colors.neutral[50]}
            text2={'Learning promo, limited time. Grab it fast!'}
            color2={Colors.neutral[50]}
          />
          <ScrollView
            px={'10px'}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <Promo mr={'18px'} />
          </ScrollView>
        </VStack>
      </Stack>
    </ScrollView>
  );
}
export default HomeScreen;
