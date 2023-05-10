import React, {useState} from 'react';
import {Center, Stack, Text} from 'native-base';
import {AllCourse, SearchBar, SearchCategory} from '../components';

function CourseScreen({navigation}) {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSearchTextChange = text => {
    setSearchText(text);
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category);
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
      <SearchBar placeholder={'Search'} onChangeText={handleSearchTextChange} />
      <SearchCategory onCategoryChange={handleCategoryChange} />
      <AllCourse searchText={searchText} selectedCategory={selectedCategory} />
    </Stack>
  );
}
export default CourseScreen;
