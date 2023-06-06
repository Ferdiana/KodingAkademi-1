import React from 'react';
import {useState} from 'react';
import {Stack} from 'native-base';
import Colors from '../theme/colors';
import {CategoryButtons, SearchBar, Transaction} from '../components';

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
