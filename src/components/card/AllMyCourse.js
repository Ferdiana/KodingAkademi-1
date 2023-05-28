import React, {useState, useContext, useEffect} from 'react';
import {
  Box,
  FlatList,
  HStack,
  Image,
  Pressable,
  Spinner,
  Stack,
  Text,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Colors from '../../theme/colors';
import {API_MyCourse} from '../../controller/API_MyCourse';
import {AuthContext} from '../../controller/AuthContext';
import formatDate from '../../controller/formatDate';

const AllMyCourse = ({searchText}) => {
  const [myCourse, setMyCourse] = useState([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadMyCourse = async () => {
      if (user.accessToken) {
        setIsLoading(true);
        const response = await API_MyCourse(user.accessToken);
        setMyCourse(response);
        setIsLoading(false);
      }
    };
    loadMyCourse();
  }, [user.accessToken]);

  const handlePress = id => {
    navigation.navigate('CourseDetail', {id});
  };

  const filteredData = myCourse.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const isExpired = date => {
    const currentDate = new Date();
    const expiredDate = new Date(date);
    return expiredDate < currentDate;
  };

  const renderItem = ({item}) => {
    const formattedDate = formatDate(item.expired_date);
    const expired = isExpired(item.expired_date);
    return (
      <Pressable onPress={() => handlePress(item.id)} my={'5px'} mx={'18px'}>
        <Stack
          opacity={expired ? 0.5 : 1}
          w={'100%'}
          borderRadius={8}
          p={'8px'}
          shadow={1}
          bg={Colors.neutral[50]}>
          <HStack h={'103px'} space={'8px'}>
            <Box w={'40%'}>
              <Image
                borderRadius={8}
                h={'100%'}
                w={'100%'}
                source={{uri: `${item.img_url}`}}
                alt="image_article"
              />
            </Box>
            <Stack pr={'8px'} w={'60%'} justifyContent={'space-evenly'}>
              <Text
                numberOfLines={2}
                fontFamily={'Inter'}
                fontSize={'14px'}
                fontWeight={600}
                color={Colors.neutral[900]}>
                {item.name}
              </Text>
              <Text
                numberOfLines={2}
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={500}
                color={Colors.neutral[900]}>
                Until {''}
                {formattedDate}
              </Text>
            </Stack>
          </HStack>
        </Stack>
      </Pressable>
    );
  };

  if (isLoading) {
    return (
      <Stack flex={1} justifyContent="center" alignItems="center">
        <Spinner
          accessibilityLabel="Loading posts"
          size="large"
          color={Colors.secondary[500]}
        />
      </Stack>
    );
  }
  return (
    <FlatList
      data={filteredData}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
    />
  );
};

export default AllMyCourse;
