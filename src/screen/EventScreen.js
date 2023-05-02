import React, {useState} from 'react';
import {
  NativeBaseProvider,
  Center,
  Text,
  Stack,
  Input,
  Icon,
  View,
} from 'native-base';
import {Event, SearchBar} from '../components';

export default function EventScreen() {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = text => {
    setSearchText(text);
  };
  return (
    <View style={{flex: 1}}>
      <SearchBar placeholder={'Search'} onChangeText={handleSearchTextChange} />
      <Event searchText={searchText} />
    </View>
  );
}
