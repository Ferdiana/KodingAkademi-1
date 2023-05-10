import React, {useState} from 'react';

import {
  Center,
  Text,
  Stack,
  FlatList,
  ScrollView,
  Divider,
  Select,
  HStack,
  Button,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native';
import CartCard from '../components/card/Cart';
import Colors from '../theme/colors';

const CheckoutScreen = ({route, navigation}) => {
  const {selectedItems, totalPrice} = route.params;

  return (
    <Stack flex={1}>
      <ScrollView>
        <Stack bgColor={'white'} px={'19'}>
          <Stack>
            {selectedItems.map(item => (
              <CartCard key={item.id} item={item} hideCheckboxAndIcon />
            ))}
          </Stack>
        </Stack>
      </ScrollView>

      <Stack py={'5px'} bgColor={'white'} px={'19'}>
        <HStack justifyContent={'space-between'}>
          <Text>Subtotal (1 items) </Text>
          <Text>Rp3.000.000 </Text>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <Text>Coupon </Text>
          <Text>-Rp100.000</Text>
        </HStack>
        <HStack justifyContent={'space-between'}>
          <Text>Total Order </Text>
          <Text>Rp. {totalPrice} </Text>
        </HStack>
      </Stack>

      <Stack
        justifyContent={'flex-end'}
        pb={'10px'}
        w={'full'}
        h={'150'}
        px={'18'}
        bgColor={Colors.secondary[100]}>
        <TouchableOpacity>
          <HStack
            h={44}
            bgColor={'white'}
            my={25}
            borderRadius={'10'}
            justifyContent={'space-between'}
            alignItems={'center'}
            px={18}>
            <Text>Apply Coupon</Text>
            <Icon name="down" color="black" size={24} />
          </HStack>
        </TouchableOpacity>
        <HStack justifyContent={'space-between'}>
          <Stack>
            <Text fontWeight={'bold'} fontSize={16} color={'white'}>
              Total Price
            </Text>
            <Text fontWeight={'bold'} fontSize={16} color={'white'}>
              Rp. {totalPrice}
            </Text>
          </Stack>
          <Stack>
            <Button
              py={'3'}
              px={'42'}
              bgColor={Colors.primary[500]}
              onPress={() => navigation.goBack()}>
              <Text color={'white'}>Pay Now</Text>
            </Button>
          </Stack>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default CheckoutScreen;
