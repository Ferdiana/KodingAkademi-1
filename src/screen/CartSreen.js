import React from 'react';
import {useState} from 'react';
import {NativeBaseProvider, Stack, ScrollView} from 'native-base';
import {dataCourse} from '../data/DataCourse';
import {Cart} from '../components';

function CartScreen() {
  const [cartItems, setCartItems] = useState([]);

  const removeFromCart = itemId => {
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const addToCart = item => {
    setCartItems([...cartItems, item]);
  };

  return (
    <NativeBaseProvider>
      <ScrollView>
        <Stack>
          {dataCourse.map(item => (
            <Cart key={item.id} item={item} removeFromCart={removeFromCart} />
          ))}
        </Stack>
      </ScrollView>
    </NativeBaseProvider>
  );
}

export default CartScreen;
