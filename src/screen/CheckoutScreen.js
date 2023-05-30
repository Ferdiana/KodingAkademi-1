import React, {useContext} from 'react';
import {
  Text,
  Stack,
  ScrollView,
  HStack,
  Button,
  Pressable,
  Center,
  Spinner,
} from 'native-base';
import CartCard from '../components/card/Cart';
import Colors from '../theme/colors';
import {AuthContext} from '../controller/AuthContext';
import {useState} from 'react';
import {Linking} from 'react-native';
import {API_Checkout, API_CheckoutWithCoupon} from '../controller/API_Checkout';

const CheckoutScreen = ({route, navigation}) => {
  const {
    selectedItems,
    totalPrice,
    discountedPrice,
    couponDiscount,
    numSelectedItems,
    selectedCoupon,
  } = route.params;
  const {user} = useContext(AuthContext);

  const displayTotalPrice = isNaN(discountedPrice)
    ? `Rp${totalPrice.toLocaleString('id-ID')}`
    : discountedPrice < 0
    ? 0
    : `Rp${discountedPrice.toLocaleString('id-ID')}`;

  const filterSelectedId = selectedItems.map(item => item.id);

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    try {
      setLoading(true);
      let response;
      if (selectedCoupon) {
        response = await API_CheckoutWithCoupon(
          user.accessToken,
          filterSelectedId,
          selectedCoupon,
        );
      } else {
        response = await API_Checkout(user.accessToken, filterSelectedId);
      }
      if (response) {
        Linking.openURL(response);
      }
    } catch (error) {
      console.error(error);
    } finally {
      navigation.replace('Payment', {total: displayTotalPrice});
      setLoading(false);
    }
  };

  return (
    <Stack flex={1}>
      {loading ? (
        <Center flex={1}>
          <Spinner accessibilityLabel="Loading posts" />
        </Center>
      ) : (
        <>
          <Stack flex={1} space={1}>
            <ScrollView>
              <Stack space={1} h={'85%'}>
                {selectedItems.map(item => (
                  <CartCard
                    WImage={'40%'}
                    WText={'60%'}
                    key={item.id}
                    item={item}
                    hideCheckboxAndIcon
                  />
                ))}
              </Stack>
            </ScrollView>
            <Stack h={'15%'} py={'5px'} bg={Colors.neutral[50]} px={'18px'}>
              <HStack justifyContent={'space-between'}>
                <Text>Subtotal ({numSelectedItems} items) </Text>
                <Text>{`Rp${totalPrice.toLocaleString('id-ID')}`}</Text>
              </HStack>
              <HStack justifyContent={'space-between'}>
                <Text>Coupon</Text>
                <Text color={'red.500'}>
                  -{' '}
                  {couponDiscount !== null && couponDiscount !== undefined
                    ? `Rp${couponDiscount.toLocaleString('id-ID')}`
                    : 'Rp0'}
                </Text>
              </HStack>
              <HStack justifyContent={'space-between'}>
                <Text>Total Order </Text>
                <Text>{displayTotalPrice}</Text>
              </HStack>
            </Stack>
          </Stack>
          <Stack
            justifyContent={'flex-end'}
            pb={'10px'}
            w={'full'}
            h={'150'}
            px={'18'}
            bgColor={Colors.secondary[100]}>
            <Pressable>
              <HStack
                h={44}
                bgColor={'white'}
                my={25}
                borderRadius={'10'}
                justifyContent={'space-between'}
                alignItems={'center'}
                px={18}>
                {couponDiscount ? (
                  <Text>
                    You get {`Rp${couponDiscount.toLocaleString('id-ID')}`}{' '}
                    promo
                  </Text>
                ) : (
                  <Text>There are no coupons used.</Text>
                )}
              </HStack>
            </Pressable>
            <HStack justifyContent={'space-between'}>
              <Stack>
                <Text fontWeight={'bold'} fontSize={16} color={'white'}>
                  Total Price
                </Text>
                <Text fontWeight={'bold'} fontSize={16} color={'white'}>
                  {`${displayTotalPrice.toLocaleString('id-ID')}`}
                </Text>
              </Stack>
              <Stack>
                <Button
                  py={'3'}
                  px={'42'}
                  bgColor={Colors.primary[500]}
                  onPress={handlePayment}>
                  <Text color={'white'}>Pay Now</Text>
                </Button>
              </Stack>
            </HStack>
          </Stack>
        </>
      )}
    </Stack>
  );
};

export default CheckoutScreen;
