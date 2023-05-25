import React, {useEffect, useContext, useState} from 'react';
import {FlatList, Box, Text, Image, Stack, Pressable} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../theme/colors';
import {AuthContext} from '../../controller/AuthContext';
import {API_Promo} from '../../controller/API_Promo';

const AllPromo = ({searchText}) => {
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const loadCourses = async () => {
      if (user.accessToken) {
        const coursesData = await API_Promo(user.accessToken);
        setCourses(coursesData);
      }
    };
    loadCourses();
  }, [user.accessToken]);

  const handlePress = id => {
    navigation.navigate('CourseDetail', {id});
  };

  const filteredData = courses.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <FlatList
      numColumns={2}
      px={'14px'}
      showsVerticalScrollIndicator={false}
      data={filteredData}
      keyExtractor={item => item.id}
      renderItem={({item}) => {
        if (!item.discount_price) {
          return null;
        }
        return (
          <Pressable p={'4px'} w={'50%'} onPress={() => handlePress(item.id)}>
            <Stack
              bgColor={'white'}
              p={2}
              borderRadius={8}
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
                  {`Rp${item.price.toLocaleString('id-ID')}`}
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
