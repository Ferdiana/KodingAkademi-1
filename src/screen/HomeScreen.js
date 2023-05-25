import React from 'react';
import {Text, HStack, VStack, Stack, Pressable, ZStack} from 'native-base';
import {
  Article,
  BannerSlider,
  HeaderHome,
  MyCourse,
  Promo,
  QRComponent,
} from '../components';
import {ImageBackground, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Colors from '../theme/colors';
import {useState} from 'react';
import {API_GetCart} from '../controller/API_Cart';
import {useContext} from 'react';
import {AuthContext} from '../controller/AuthContext';
import {useEffect} from 'react';
import {API_MyCourse} from '../controller/API_MyCourse';
import {useIsFocused} from '@react-navigation/native';

const Title = ({text1, color1, text2, color2, onPress}) => {
  return (
    <Stack px={5} mb={'10px'}>
      <HStack justifyContent={'space-between'} alignItems={'center'}>
        <Text
          color={color1}
          fontFamily={'Inter'}
          fontWeight={600}
          fontSize={'14px'}>
          {text1}
        </Text>
        <Pressable onPress={onPress}>
          <Text
            color={'primary.500'}
            underline
            fontFamily={'Inter'}
            fontWeight={600}
            fontSize={'12px'}>
            See all
          </Text>
        </Pressable>
      </HStack>
      <Text
        color={color2}
        fontFamily={'Inter'}
        fontWeight={500}
        fontSize={'12px'}>
        {text2}
      </Text>
    </Stack>
  );
};

function HomeScreen({navigation}) {
  const {user} = useContext(AuthContext);
  const [myCourse, setMyCourse] = useState([]);
  const [expiredDate, setExpiredDate] = useState(null);
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const loadMyCourse = async () => {
      if (user.accessToken) {
        const response = await API_MyCourse(user.accessToken);
        setMyCourse(response);
      }
    };
    loadMyCourse();
  }, [user.accessToken]);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <VStack>
        <HeaderHome navigation={navigation} />
      </VStack>
      <Stack space={1}>
        <VStack py={'10px'} bg={Colors.neutral[50]}>
          <Title
            onPress={() => navigation.navigate('MyCourse')}
            text1={'My Course'}
            color1={Colors.neutral[900]}
            text2={'List of courses I am currently taking or have completed.'}
            color2={Colors.neutral[700]}
          />
          <ScrollView
            px={'10px'}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <MyCourse mr={'18px'} />
          </ScrollView>
        </VStack>
        <Stack py={'10px'} bg={Colors.neutral[50]}>
          <ImageBackground
            source={require('../assets/image/bg.png')}
            resizeMode="cover">
            <VStack py={'10px'}>
              <Title
                onPress={() => navigation.navigate('Event')}
                text1={'Latest Events'}
                color1={Colors.neutral[50]}
                text2={'Check out exciting and interesting events for you!'}
                color2={Colors.neutral[50]}
              />
              <BannerSlider />
            </VStack>
          </ImageBackground>
        </Stack>
        <VStack py={'10px'} bg={Colors.neutral[50]}>
          <Title
            onPress={() => navigation.navigate('Article')}
            text1={'Article'}
            color1={Colors.neutral[900]}
            text2={"Let's read the article to increase your knowledge!"}
            color2={Colors.neutral[700]}
          />
          <ScrollView
            px={'10px'}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <Article mr={'18px'} />
          </ScrollView>
        </VStack>
        <VStack py={'10px'} bg={Colors.secondary[300]}>
          <Title
            onPress={() => navigation.navigate('Promo')}
            text1={'Course Promo'}
            color1={Colors.neutral[50]}
            text2={'Learning promo, limited time. Grab it fast!'}
            color2={Colors.neutral[50]}
          />
          <ScrollView
            px={'10px'}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            <Promo mr={'18px'} />
          </ScrollView>
        </VStack>
      </Stack>
    </ScrollView>
  );
}
export default HomeScreen;
