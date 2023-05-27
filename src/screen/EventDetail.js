import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  Text,
  Stack,
  Center,
  Image,
  ScrollView,
  Pressable,
  HStack,
  ZStack,
} from 'native-base';
import {AuthContext} from '../controller/AuthContext';
import Colors from '../theme/colors';
import Btn_Primary from '../components/button/Btn_Primary';
import {StyleSheet} from 'react-native';
import HTMLContentView from 'react-native-htmlview';
import {Dropdown} from 'react-native-element-dropdown';
import {API_DetailEvents} from '../controller/API_Events';
import {API_AddCart, API_GetCart} from '../controller/API_Cart';
import Icon from 'react-native-vector-icons/Feather';
import {API_MyCourse} from '../controller/API_MyCourse';

const EventDetailScreen = ({route, navigation}) => {
  const [selectedValue, setSelectedValue] = useState('');
  const {user} = useContext(AuthContext);
  const [eventDetail, setEventDetail] = useState({});
  const [dropdownOption, setDropdownOption] = useState([]);
  const [isInCart, setIsInCart] = useState(false);
  const [isInMyCourse, setIsInMyCourse] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const {id} = route.params;
    const loadEventsDetail = async () => {
      const response = await API_DetailEvents(id, user.accessToken);
      if (response) {
        setEventDetail(response);
        setDropdownOption(response.event_dates);
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
    const checkNumberOfCart = async () => {
      if (user.accessToken) {
        const coursesData = await API_GetCart(user.accessToken);
        const count = coursesData.cart_items.length;
        setCartItemCount(count);
      }
    };

    checkNumberOfCart();
    checkIfInCart();
    checkIfInMyCourse();
    loadEventsDetail();
    checkIfInCart();
    setRefresh(false);
  }, [route.params, user.accessToken]);

  const handleAddToCart = useCallback(
    async id => {
      try {
        await API_AddCart(user.accessToken, eventDetail.id);
        console.log('sukses');
        setRefresh(true); // Set state refresh menjadi true
      } catch (error) {
        console.error(error);
      }
    },
    [user.accessToken, eventDetail.id],
  );

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const convertedOptions = dropdownOption.map(option => {
    const formattedDate = formatDate(option.date);
    return {date: formattedDate};
  });

  return (
    <Stack bg={Colors.neutral[50]} flex={1}>
      <ScrollView key={refresh.toString()} showsVerticalScrollIndicator={false}>
        <Center w={'full'} h={'324px'} px={'18px'} py={'10px'}>
          <Image
            borderRadius={8}
            source={{uri: eventDetail.img_url}}
            alt="img_product"
            h={'100%'}
            width={'100%'}
          />
        </Center>
        <Stack px={'18px'}>
          <Text fontFamily={'Inter'} fontWeight={600} fontSize={'20px'}>
            {eventDetail.name}
          </Text>
          <Text fontFamily={'Inter'} fontWeight={500} fontSize={'16px'}>
            {eventDetail.price
              ? `Rp${eventDetail.price.toLocaleString('id-ID')}`
              : 'FREE'}
          </Text>
          <Text
            fontFamily={'Inter'}
            fontWeight={500}
            fontSize={'14px'}
            mt={'5px'}>
            Description
          </Text>
          <HTMLContentView
            value={eventDetail.description}
            stylesheet={styles}
          />
          <Text
            fontFamily={'Inter'}
            fontWeight={500}
            fontSize={'14px'}
            mt={'5px'}>
            Remaining quota
          </Text>
          <Text fontFamily={'Inter'} fontWeight={400} fontSize={'12px'}>
            {eventDetail.participants}/{eventDetail.quota} Participants
          </Text>
          <Stack space={'5px'} mb={'80px'}>
            <Text fontFamily={'Inter'} fontSize={'14px'} fontWeight={500}>
              Choose Event Date
            </Text>
            <Dropdown
              style={styles.Dropdown}
              fontFamily="Inter"
              data={convertedOptions}
              valueField="date"
              labelField={'date'}
              placeholder={'Select an option'}
              value={selectedValue}
              onChange={itemValue => setSelectedValue(itemValue)}
            />
          </Stack>
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
            disabled={isInMyCourse || isInCart}
          />
        </Stack>
      </HStack>
    </Stack>
  );
};

const styles = StyleSheet.create({
  Dropdown: {
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  p: {
    textAlign: 'justify',
    lineHeight: 18,
    fontSize: 12,
  },
  ul: {
    textAlign: 'justify',
  },
  li: {
    textAlign: 'justify',
  },
});

export default EventDetailScreen;
