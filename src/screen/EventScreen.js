import React, {useState} from 'react';
import {View} from 'native-base';
import {Event, SearchBar} from '../components';

export default function EventScreen() {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = text => {
    setSearchText(text);
  };
  return (
    <View flex={1}>
      <SearchBar placeholder={'Search'} onChangeText={handleSearchTextChange} />
      <Event searchText={searchText} />
    </View>
  );
}
