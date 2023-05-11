import React, {useState} from 'react';
import {View} from 'native-base';
import SearchBar from '../components/search/SearchBar';
import Colors from '../theme/colors';
import {AllEvent} from '../components';

export default function EventScreen() {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = text => {
    setSearchText(text);
  };
  return (
    <View flex={1} bg={Colors.neutral[50]}>
      <SearchBar
        shadow={1}
        placeholder={'Search'}
        onChangeText={handleSearchTextChange}
      />
      <AllEvent searchText={searchText} />
    </View>
  );
}
