import React from 'react';
import {useState} from 'react';
import {Stack, Text, HStack, Image, ScrollView, FlatList} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Colors from '../theme/colors';
import {SearchBar} from '../components';
import API_Transaction from '../controller/API_Transaction';
import {useContext} from 'react';
import {AuthContext} from '../controller/AuthContext';
import {useEffect} from 'react';

const TransactionScreen = ({}) => {
  const [transaction, setTransaction] = useState([]);
  const {user} = useContext(AuthContext);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const loadTranscation = async () => {
      if (user.accessToken) {
        const response = await API_Transaction(user.accessToken);
        setTransaction(response);
      }
    };
    loadTranscation();
  }, [user.accessToken]);

  const handleSearchTextChange = text => {
    setSearchText(text);
  };

  const renderItem = ({item}) => {
    return (
      <Stack borderWidth={1} p={4} my={2}>
        <Text>ID: {item.id}</Text>
        <Text>Invoice ID: {item.invoice_id}</Text>
        <Text>Status: {item.order_status}</Text>
        {item.order.map(orderItem => (
          <Stack key={orderItem.product_id}>
            <Text>Product Name: {orderItem.Product.name}</Text>
            <Text>Product Description: {orderItem.Product.description}</Text>
            <Image
              source={{uri: orderItem.Product.img_url}}
              alt={orderItem.Product.name}
              size={'md'}
              my={2}
            />
          </Stack>
        ))}
        {item.transaction.map(trans => (
          <Stack>
            <Text>Bank Name: {trans.bank_name}</Text>
            <Text>Date: {trans.date}</Text>
            <Text>Payment Method: {trans.payment_method}</Text>
            <Text>Payment Status: {trans.payment_status}</Text>
          </Stack>
        ))}
        <Text>Total: {item.total}</Text>
      </Stack>
    );
  };

  return (
    <Stack bg={Colors.neutral[50]} flex={1}>
      <Stack my={2}>
        <SearchBar
          onChangeText={handleSearchTextChange}
          placeholder={'Search transaction...'}
        />
      </Stack>
      <FlatList
        pt={'5px'}
        px={'18px'}
        data={transaction}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </Stack>
  );
};

export default TransactionScreen;
