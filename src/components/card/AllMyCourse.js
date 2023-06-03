import React, {useState, useContext, useEffect} from 'react';
import {Box, FlatList, HStack, Image, Spinner, Stack, Text} from 'native-base';
import Colors from '../../theme/colors';
import {API_MyCourse} from '../../controller/API_MyCourse';
import {AuthContext} from '../../controller/AuthContext';
import formatDate from '../../controller/formatDate';
import {Pressable, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const AllMyCourse = ({searchText, selectedCategory}) => {
  const [myCourse, setMyCourse] = useState([]);
  const {user} = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const loadMyCourse = async () => {
      if (user.accessToken) {
        setIsLoading(true);
        const response = await API_MyCourse(user.accessToken);
        const sortedDataa = response.sort(
          (a, b) => new Date(b.expired_date) - new Date(a.expired_date),
        );
        setMyCourse(sortedDataa);
        setIsLoading(false);
      }
    };

    loadMyCourse();
  }, [user.accessToken]);

  const filteredData = myCourse.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const isExpired = date => {
    const currentDate = new Date();
    const expiredDate = new Date(date);
    if (expiredDate < currentDate) {
      return true;
    } else {
      return false;
    }
  };

  const handlePress = id => {
    navigation.navigate('CourseDetail', {id});
  };

  const renderItem = ({item}) => {
    if (
      selectedCategory &&
      selectedCategory.toLowerCase() !==
        (isExpired(item.expired_date) ? 'finished' : 'active')
    ) {
      return null;
    }
    const formattedDate = formatDate(item.expired_date);
    const expired = isExpired(item.expired_date);
    return (
      <Pressable onPress={() => handlePress(item.id)}>
        <Stack my={'5px'} mx={'18px'}>
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
              <Stack pr={'8px'} w={'60%'} justifyContent={'space-between'}>
                <Text
                  numberOfLines={2}
                  fontFamily={'Inter'}
                  fontSize={'14px'}
                  fontWeight={600}
                  color={Colors.neutral[900]}>
                  {item.name}
                </Text>
                <Text
                  numberOfLines={1}
                  fontFamily={'Inter'}
                  fontSize={'12px'}
                  fontWeight={500}
                  color={Colors.neutral[900]}>
                  Until {''}
                  {formattedDate}
                </Text>
                <Text
                  color={expired ? Colors.neutral[500] : Colors.primary[500]}
                  fontFamily={'Inter'}
                  fontSize={'14px'}
                  fontWeight={600}>
                  {expired ? 'Finished' : 'Active'}
                </Text>
              </Stack>
            </HStack>
          </Stack>
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
    <Stack flex={1}>
      {filteredData.length === 0 ? (
        <Stack mt={'40px'} justifyContent={'center'} alignItems={'center'}>
          <Image
            source={require('../../assets/image/emptymycourse.png')}
            alt={'img'}
            h={230}
            w={208}
          />
          <Text fontWeight={'bold'} fontSize={'24'}>
            No Course
          </Text>
          <Text textAlign={'center'}>
            You haven't taken any courses. Let's take the course you want now.
          </Text>
        </Stack>
      ) : (
        <FlatList
          data={filteredData}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </Stack>
  );
};

const styles = StyleSheet.create({
  p: {
    textAlign: 'justify',
    color: '#33404C',
    fontSize: 12,
  },
  body: {
    textAlign: 'justify',
    color: '#000',
  },
});

export default AllMyCourse;
