import {ScrollView, Stack} from 'native-base';
import React, {useState} from 'react';
import {AttendedEvent, SearchBar, SearchCategory} from '../components';
import Colors from '../theme/colors';
import {categoriesEvent} from '../data/DataEvent';

const AttendedEventScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

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
      <Stack
        px={'18px'}
        flexDirection={'row'}
        width={'100%'}
        my={2}
        justifyContent={'space-between'}>
        <SearchCategory
          title="All"
          onPress={() => setSelectedCategory(null)}
          selected={!selectedCategory}
        />
        {categoriesEvent.map((category, index) => (
          <SearchCategory
            key={index}
            title={category}
            onPress={() => setSelectedCategory(category)}
            selected={category === selectedCategory}
          />
        ))}
      </Stack>
      <AttendedEvent
        selectedCategory={selectedCategory}
        searchText={searchText}
      />
    </Stack>
  );
};
export default AttendedEventScreen;
