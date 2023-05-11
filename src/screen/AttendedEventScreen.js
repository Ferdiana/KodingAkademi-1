import {Stack} from 'native-base';
import React, {useState} from 'react';
import {AttendedEvent, SearchBar, SearchCategory} from '../components';
import Colors from '../theme/colors';

const AttendedEventScreen = () => {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = text => {
    setSearchText(text);
  };
  return (
    <Stack space={'10px'} flex={1} bg={Colors.neutral[50]}>
      <SearchBar
        shadow={1}
        placeholder={'Search attended events...'}
        onChangeText={handleSearchTextChange}
      />
      <SearchCategory />
      <AttendedEvent searchText={searchText} />
    </Stack>
  );
};
export default AttendedEventScreen;
