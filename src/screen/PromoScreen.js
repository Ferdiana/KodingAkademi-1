import React, {useState} from 'react';
import {Center, Stack, Text} from 'native-base';
import {AllPromo, SearchBar} from '../components';

function PromoScreen({navigation}) {
  const [searchText, setSearchText] = useState('');

  const handleSearchTextChange = text => {
    setSearchText(text);
  };
  return (
    <Stack bg={'neutral.50'} flex={1}>
      <Center bg={'secondary.50'} h={'42px'}>
        <Text
          color={'neutral.50'}
          fontFamily={'Inter'}
          fontSize={'14px'}
          fontWeight={600}>
          All Promo
        </Text>
      </Center>
      <SearchBar placeholder={'Search'} onChangeText={handleSearchTextChange} />
      <AllPromo navigation={navigation} searchText={searchText} />
    </Stack>
  );
}
export default PromoScreen;
