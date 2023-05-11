import React, {useState} from 'react';
import {Box, Center, Stack, Text} from 'native-base';
import {AllCourse, SearchBar} from '../components';
import Colors from '../theme/colors';

function CourseScreen({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearchTextChange = text => {
    setSearchText(text);
  };

  return (
    <Stack flex={1} bg={'neutral.50'}>
      <Center bg={'secondary.50'} h={'42px'}>
        <Text
          color={'neutral.50'}
          fontFamily={'Inter'}
          fontSize={'14px'}
          fontWeight={600}>
          All Course
        </Text>
      </Center>
      <SearchBar
        pb={'20px'}
        bg={Colors.secondary[50]}
        placeholder={'Search'}
        onChangeText={handleSearchTextChange}
      />
      <Box my={'5px'} />
      <AllCourse searchText={searchText} selectedCategory={selectedCategory} />
    </Stack>
  );
}
export default CourseScreen;
