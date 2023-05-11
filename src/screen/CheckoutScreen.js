import React from 'react';
import {Text, Stack, ScrollView, HStack, Button, Pressable} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import CartCard from '../components/card/Cart';
import Colors from '../theme/colors';
const CheckoutScreen = ({route, navigation}) => {
  const {selectedItems, totalPrice, discountedPrice, couponDiscount} =
    route.params;

  return (
    <Stack flex={1}>
      <Stack flex={1} space={1}>
        <Stack space={1}>
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
        <Stack flex={1} py={'5px'} bg={Colors.neutral[50]} px={'18px'}>
          <HStack justifyContent={'space-between'}>
            <Text>Subtotal (1 items) </Text>
            <Text>Rp. {totalPrice} </Text>
          </HStack>
          {couponDiscount !== 0 && (
            <HStack justifyContent={'space-between'}>
              <Text>Coupon</Text>
              <Text>- Rp. {couponDiscount}</Text>
            </HStack>
          )}
          <HStack justifyContent={'space-between'}>
            <Text>Total Order </Text>
            <Text>Rp. {discountedPrice}</Text>
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
              <Text>You get Rp {couponDiscount} promo</Text>
            ) : (
              <Text>Apply Coupon</Text>
            )}
            <Icon name="down" color="black" size={24} />
          </HStack>
        </Pressable>
        <HStack justifyContent={'space-between'}>
          <Stack>
            <Text fontWeight={'bold'} fontSize={16} color={'white'}>
              Total Price
            </Text>
            <Text fontWeight={'bold'} fontSize={16} color={'white'}>
              Rp. {discountedPrice}
            </Text>
          </Stack>
          <Stack>
            <Button
              py={'3'}
              px={'42'}
              bgColor={Colors.primary[500]}
              onPress={() =>
                navigation.navigate('Payment', {total: discountedPrice})
              }>
              <Text color={'white'}>Pay Now</Text>
            </Button>
          </Stack>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default CheckoutScreen;
