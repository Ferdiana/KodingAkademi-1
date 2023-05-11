import React from 'react';
import {Box, Text, Image, Stack, Pressable, View} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {FlatGrid} from 'react-native-super-grid';
import Colors from '../../theme/colors';
import {useState} from 'react';
import {AuthContext} from '../../controller/AuthContext';
import {useContext} from 'react';
import {useEffect} from 'react';
import {API_Course} from '../../controller/API_Course';

const AllPromo = ({searchText}) => {
  const [courses, setCourses] = useState([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const loadCourses = async () => {
      if (user.accessToken) {
        const coursesData = await API_Course(user.accessToken);
        setCourses(coursesData);
      }
    };
    loadCourses();
  }, [user.accessToken]);

  const handleClick = id => {
    navigation.navigate('PromoDetail', {itemId: id});
  };

  const filteredData = courses.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <FlatGrid
      showsVerticalScrollIndicator={false}
      itemDimension={150}
      data={filteredData}
      spacing={10}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        if (!item.discount_price) {
          return null;
        }
        return (
          <Pressable onPress={() => handleClick(item.id)} mt={1}>
            <Stack
              bgColor={'white'}
              p={2}
              borderRadius={10}
              borderColor={Colors.primary[600]}
              shadow={1}>
              <Image
                source={{uri: item.img_url}}
                w={'full'}
                h={'100'}
                alt={'image'}
                borderRadius={10}
              />
              <Box>
                <Box>
                  <Text
                    mb={'2px'}
                    numberOfLines={2}
                    py={'4px'}
                    fontFamily={'Inter'}
                    fontSize={'14px'}
                    fontWeight={600}
                    h={'50px'}
                    color={Colors.primary[600]}>
                    {item.name}
                  </Text>
                </Box>
                <Text
                  fontFamily={'Inter'}
                  color={Colors.neutral[900]}
                  fontWeight={500}>
                  {`Rp${item.discount_price.toLocaleString('id-ID')}`}
                </Text>
                <Text
                  fontFamily={'Inter'}
                  fontWeight={400}
                  textDecorationLine={'line-through'}
                  color={Colors.neutral[200]}>
                  {`Rp${item.discount_price.toLocaleString('id-ID')}`}
                </Text>
              </Box>
            </Stack>
          </Pressable>
        );
      }}
    />
  );
};

export default AllPromo;
