import React from 'react';
import {Box, Text, Image, Stack, Pressable, View} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {FlatGrid} from 'react-native-super-grid';
import Colors from '../../theme/colors';
import {dataCourse} from '../../data/DataCourse';

const AllPromo = ({searchText}) => {
  const navigation = useNavigation();

  const handleClick = id => {
    navigation.navigate('PromoDetail', {itemId: id});
  };

  const filteredData = dataCourse.filter(item =>
    item.title.toLowerCase().includes(searchText.toLowerCase()),
  );

  const numResults = filteredData.length;

  return (
    <Stack bg={'neutral.50'}>
      <Stack>
        {searchText && (
          <View px={'10px'} h={'full'}>
            <Text fontSize={14} fontWeight={'900'}>
              Search results for{' '}
              <Text color={Colors.primary[500]}>"{searchText}"</Text> in Promo
            </Text>
            <Text>
              {numResults} {numResults > 1 ? 'results' : 'result'} found
            </Text>
          </View>
        )}
        <FlatGrid
          showsVerticalScrollIndicator={false}
          itemDimension={150}
          data={filteredData}
          spacing={5}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <Pressable onPress={() => handleClick(item.id)} mt={1}>
              <Stack
                bgColor={'white'}
                p={2}
                borderRadius={10}
                borderColor={Colors.primary[600]}
                shadow={2}>
                <Image
                  source={{uri: item.image}}
                  w={'full'}
                  h={'100'}
                  alt={'image'}
                  borderRadius={10}
                />
                <Box>
                  <Box>
                    <Text
                      py={'4px'}
                      fontFamily={'Inter'}
                      fontSize={14}
                      fontWeight={600}
                      h={'50px'}
                      color={Colors.primary[600]}>
                      {item.title}
                    </Text>
                  </Box>
                  <Text
                    fontFamily={'Inter'}
                    color={Colors.neutral[900]}
                    fontWeight={500}>
                    {item.priceNew}
                  </Text>
                  <Text
                    fontFamily={'Inter'}
                    fontWeight={400}
                    textDecorationLine={'line-through'}
                    color={Colors.neutral[200]}>
                    {item.priceOld}
                  </Text>
                </Box>
              </Stack>
            </Pressable>
          )}
        />
      </Stack>
    </Stack>
  );
};

export default AllPromo;
