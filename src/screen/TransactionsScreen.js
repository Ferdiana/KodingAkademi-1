import React from 'react';
import {useState} from 'react';
import {
  Stack,
  Text,
  HStack,
  Image,
  FlatList,
  Pressable,
  Center,
  Spinner,
} from 'native-base';
import Colors from '../theme/colors';
import {CategoryButtons, SearchBar, Transaction} from '../components';
import {API_Transaction} from '../controller/API_Transaction';
import {useContext} from 'react';
import {AuthContext} from '../controller/AuthContext';
import {useEffect} from 'react';
// import formatDate from '../controller/formatDate';

const TransactionScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearchTextChange = text => {
    setSearchText(text);
  };

  return (
    <Stack bg={Colors.neutral[50]} flex={1}>
      <Stack my={2}>
        <SearchBar
          onChangeText={handleSearchTextChange}
          placeholder={'Search transaction...'}
        />
      </Stack>
      <Stack my={2}>
        <CategoryButtons
          categories={['Success', 'Pending', 'Canceled']}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </Stack>
      <Transaction
        navigation={navigation}
        searchText={searchText}
        selectedCategory={selectedCategory}
      />
    </Stack>
  );
};

export default TransactionScreen;
