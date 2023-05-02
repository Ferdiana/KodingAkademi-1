import React from 'react';
import {Input, Icon, Stack} from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SearchBar({placeholder, onChangeText, value}) {
  return (
    <Stack
      w={'100%'}
      px={'10px'}
      pb={'20px'}
      bg={'secondary.50'}
      borderBottomRadius={10}>
      <Input
        variant="filled"
        focusOutlineColor={'neutral.50'}
        placeholder={placeholder}
        placeholderTextColor={'neutral.700'}
        borderRadius={10}
        InputLeftElement={
          <Icon
            as={<MaterialIcons name="search" />}
            size={5}
            ml="10px"
            color="black"
          />
        }
        backgroundColor={'neutral.50'}
        onChangeText={onChangeText}
        w={'full'}
      />
    </Stack>
  );
}
