import {Stack} from 'native-base';
import React, {useState} from 'react';
import {
  AllCourse,
  AllMyCourse,
  MyCourse,
  SearchBar,
  SearchCategory,
} from '../components';
import Colors from '../theme/colors';

const MyCourseScreen = () => {
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
      <AllMyCourse searchText={searchText} />
    </Stack>
  );
};
export default MyCourseScreen;
