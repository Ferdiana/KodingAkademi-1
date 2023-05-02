import React from 'react';
import {HStack, Image, Pressable, Stack, Text} from 'native-base';
import {dataCourse} from '../../data/DataCourse';
import Colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';

const AllCourse = ({searchText, selectedCategory}) => {
  const navigation = useNavigation();

  const handleClick = id => {
    navigation.navigate('PromoDetail', {itemId: id});
  };

  const filteredData = dataCourse
    .filter(item => item.title.toLowerCase().includes(searchText.toLowerCase()))
    .filter(item =>
      selectedCategory ? item.category === selectedCategory : true,
    );

  return (
    <Stack flex={1} space={'10px'} pb={'10px'} px={'10px'}>
      {filteredData.map(item => {
        return (
          <Pressable key={item.id} onPress={() => handleClick(item.id)}>
            <Stack
              borderWidth={1}
              borderColor={Colors.neutral[300]}
              w={'100%'}
              p={'8px'}
              borderRadius={10}
              mr={2}>
              <HStack h={'100px'}>
                <Image
                  source={{uri: `${item.image}`}}
                  alt={'img'}
                  w={'30%'}
                  h={'100%'}
                  resizeMode="center"
                  borderRadius={10}
                />
                <Stack w={'70%'} px={'5px'} justifyContent={'space-between'}>
                  <Text
                    numberOfLines={1}
                    letterSpacing={'0.5px'}
                    fontFamily={'Inter'}
                    fontSize={'14px'}
                    fontWeight={600}
                    color={Colors.neutral[900]}>
                    {item.title}
                  </Text>
                  <Text
                    numberOfLines={3}
                    lineHeight={'18px'}
                    letterSpacing={'0.5px'}
                    fontFamily={'Inter'}
                    fontSize={'12px'}
                    fontWeight={200}
                    color={Colors.neutral[800]}>
                    {item.description}
                  </Text>
                  <HStack justifyContent={'space-between'}>
                    <Text
                      strikeThrough
                      fontFamily={'Inter'}
                      letterSpacing={'0.5px'}
                      fontSize={'14px'}
                      fontWeight={500}
                      color={Colors.neutral[300]}>
                      {item.priceOld}
                    </Text>
                    <Text
                      fontFamily={'Inter'}
                      letterSpacing={'0.5px'}
                      fontSize={'14px'}
                      fontWeight={500}
                      color={Colors.neutral[900]}>
                      {item.priceNew}
                    </Text>
                  </HStack>
                </Stack>
              </HStack>
            </Stack>
          </Pressable>
        );
      })}
    </Stack>
  );
};

export default AllCourse;
