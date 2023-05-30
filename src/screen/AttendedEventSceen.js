import {Stack} from 'native-base';
import React, {useState} from 'react';
import {AllMyEvent, SearchBar} from '../components';
import Colors from '../theme/colors';

const AttendedEventSceen = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = text => {
    setSearchText(text);
  };
  return (
    <Stack space={'12px'} flex={1} bg={Colors.neutral[50]}>
      <SearchBar
        shadow={1}
        placeholder={'Search my course...'}
        onChangeText={handleSearchTextChange}
      />
      <AllMyEvent searchText={searchText} />
    </Stack>
  );
};
export default AttendedEventSceen;
