import {
  Box,
  Pressable,
  ScrollView,
  Text,
  Flex,
  HStack,
  Center,
} from 'native-base';
import React, {useState} from 'react';
import {categories} from '../../data/DataCourse';
import Colors from '../../theme/colors';

const CategoryButton = ({title, onPress, selected}) => {
  return (
    <Pressable onPress={onPress}>
      <Center
        bg={selected ? Colors.primary[500] : Colors.neutral[50]}
        h={'34px'}
        px={'10px'}
        borderWidth={selected ? '0' : '1'}
        borderColor={Colors.neutral[300]}
        borderRadius={'30px'}>
        <Text
          fontFamily={'Inter'}
          fontSize={12}
          fontWeight={600}
          color={selected ? Colors.neutral[50] : Colors.neutral[300]}
          textAlign="center">
          {title}
        </Text>
      </Center>
    </Pressable>
  );
};

const SearchCategory = ({onCategoryChange}) => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryPress = category => {
    setSelectedCategory(category);
    onCategoryChange(category);
  };

  return (
    <HStack my={'10px'} bg={'transparent'}>
      <ScrollView
        pl={'10px'}
        horizontal={true}
        showsHorizontalScrollIndicator={false}>
        <CategoryButton
          title="All"
          onPress={() => handleCategoryPress(null)}
          selected={!selectedCategory}
        />
        {categories.map((category, index) => (
          <CategoryButton
            key={index}
            title={category}
            onPress={() => handleCategoryPress(category)}
            selected={category === selectedCategory}
          />
        ))}
      </ScrollView>
    </HStack>
  );
};

export default SearchCategory;
