import React, {useContext, useState, useEffect} from 'react';
import {Box, Center, Flex, Image, Pressable, Text} from 'native-base';
import Colors from '../../theme/colors';
import {useNavigation} from '@react-navigation/native';
import {API_MyCourse} from '../../controller/API_MyCourse';
import {AuthContext} from '../../controller/AuthContext';

const MyCourse = ({mr}) => {
  const [myCourse, setMyCourse] = useState([]);
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const loadMyCourse = async () => {
      if (user.accessToken) {
        const articleData = await API_MyCourse(user.accessToken);
        setMyCourse(articleData);
      }
    };
    loadMyCourse();
  }, [user.accessToken]);

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };

  const handlePress = id => {
    navigation.navigate('CourseDetail', {id});
  };
  return (
    <Flex flexDirection={'row'} mr={mr} p={'10px'}>
      {myCourse.map(item => {
        const formattedDate = formatDate(item.expired_date);

        return (
          <Pressable key={item.id} onPress={() => handlePress(item.id)}>
            <Box
              key={item.id}
              w={'140px'}
              h={'170px'}
              px={'10px'}
              pt={'5px'}
              mr={2}
              bg={Colors.neutral[50]}
              borderRadius={8}
              shadow={1}>
              <Center>
                <Image
                  source={{uri: `${item.img_url}`}}
                  alt={'img'}
                  w={'100%'}
                  h={'84px'}
                  borderRadius={8}
                />
              </Center>
              <Text
                numberOfLines={2}
                mt={'5px'}
                h={'38px'}
                fontFamily={'Inter'}
                fontSize={'12px'}
                fontWeight={600}
                color={Colors.neutral[900]}>
                {item.name}
              </Text>
              <Text
                mt={'5px'}
                fontFamily={'Inter'}
                fontWeight={300}
                fontSize={'10px'}
                color={Colors.neutral[900]}>
                Until {''}
                {formattedDate}
              </Text>
            </Box>
          </Pressable>
        );
      })}
    </Flex>
  );
};

export default MyCourse;
