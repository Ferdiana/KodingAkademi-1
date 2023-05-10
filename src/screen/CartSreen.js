import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {Text, Stack, ScrollView, HStack, Button} from 'native-base';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CartCard from '../components/card/Cart';
import Colors from '../theme/colors';

const CartScreen = ({route}) => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Basic Coding Test',
      category: 'Coding',
      image: 'https://picsum.photos/200/301',
      description:
        'Basic coding is an introductory for kids to learn about programming in a fun and enjoyable way.',
      price: 500000,
    },
    {
      id: 2,
      title: 'Arduino Intermediate',
      category: 'Robotic',
      image: 'https://picsum.photos/200/302',
      description:
        'Basic coding is an introductory for kids to learn about programming in a fun and enjoyable way.',
      price: 1500000,
    },
  ]);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelectItem = item => {
    const isSelected = selectedItems.some(
      selectedItem => selectedItem.id === item.id,
    );

    if (isSelected) {
      setSelectedItems(prevItems =>
        prevItems.filter(selectedItem => selectedItem.id !== item.id),
      );
    } else {
      setSelectedItems(prevItems => [...prevItems, item]);
    }
  };

  const handleDeleteItem = itemId => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    setSelectedItems(prevItems => prevItems.filter(item => item.id !== itemId));
  };

  const renderCartItems = () => {
    return cartItems.map(item => (
      <CartCard
        key={item.id}
        item={item}
        onSelectItem={handleSelectItem}
        onDeleteItem={handleDeleteItem}
      />
    ));
  };

  const navigation = useNavigation();

  const handleCheckout = () => {
    navigation.navigate('Checkout', {selectedItems, totalPrice: totalPrice()});
  };

  const handleClick = () => {
    navigation.navigate('Coupon', {totalPrice: totalPrice()});
  };

  const totalPrice = () => {
    const totalPrice = selectedItems.reduce(
      (total, item) => total + item.price,
      0,
    );
    return totalPrice;
  };

  return (
    <Stack flex={1} bg={Colors.neutral[50]}>
      <ScrollView>
        <Stack>
          {renderCartItems()}
          {cartItems.length === 0 && (
            <Stack>
              <Text>Your cart is empty</Text>
            </Stack>
          )}
        </Stack>
      </ScrollView>

      <Stack
        pb={'10px'}
        w={'full'}
        h={'150'}
        px={'18'}
        bgColor={Colors.secondary[100]}>
        <TouchableOpacity onPress={handleClick}>
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
              Total
            </Text>
            <Text fontWeight={'bold'} fontSize={16} color={'white'}>
              Rp. {totalPrice()}
            </Text>
          </Stack>
          <Stack>
            <Button
              py={'3'}
              px={'42'}
              bgColor={Colors.primary[500]}
              onPress={handleCheckout}>
              <Text color={'white'}>Checkout</Text>
            </Button>
          </Stack>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default CartScreen;
