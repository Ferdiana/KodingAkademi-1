import React from 'react';
import {Center, Text, Image, Stack} from 'native-base';
import {Btn_Primary, Btn_Icon, Btn_Outline} from '../components';
import {Dimensions} from 'react-native';
import {ImageBackground} from 'react-native';

const screenWidth = Dimensions.get('window').width;

function OnBoardingScreen({navigation}) {
  return (
    <Center flex={1}>
      <ImageBackground
        source={require('../assets/image/bg.png')}
        resizeMode="cover">
        <Stack h={'50%'} justifyContent={'center'} px={10}>
          <Image
            source={require('../assets/image/logo.png')}
            alt={'Logo'}
            resizeMode={'contain'}
            maxH={20}
            mb={10}
          />
          <Text
            fontFamily={'Inter'}
            fontWeight={'600'}
            fontSize={'2xl'}
            color={'neutral.50'}>
            Koding Akademi Mobile
          </Text>
          <Text
            fontFamily={'Inter'}
            fontWeight={'500'}
            mt={2}
            color={'neutral.50'}
            fontSize={'md'}
            textAlign={'justify'}>
            Welcome to the Koding Academy Mobile App!
          </Text>
        </Stack>
        <Stack
          pt={10}
          space={4}
          bg={'neutral.50'}
          borderTopRadius={30}
          h={'50%'}
          alignItems={'center'}>
          <Btn_Primary
            w={screenWidth}
            text={'Register'}
            padding={10}
            onPress={() => navigation.replace('Register')}
          />
          <Btn_Outline
            w={screenWidth}
            text={'Log In'}
            padding={10}
            onPress={() => navigation.replace('Login')}
          />
          <Text color={'neutral.200'} fontSize={'xs'} my={2}>
            or
          </Text>
          <Btn_Icon
            borderWidth={1}
            w={screenWidth}
            text={'Continue with Google'}
            padding={10}
            size={6}
            source={require('../assets/image/google.png')}
          />
        </Stack>
      </ImageBackground>
    </Center>
  );
}
export default OnBoardingScreen;
