import {
  Alert,
  Center,
  HStack,
  Pressable,
  ScrollView,
  Stack,
  Text,
} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Btn_Icon, FormLogin} from '../components';
import {Dimensions} from 'react-native';
import {ImageBackground} from 'react-native';

const screenWidth = Dimensions.get('window').width;

function LoginScreen({navigation}) {
  const [errorMsg, setErrorMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const handleError = error => {
    setErrorMsg(error.response.data.message);
    setShowAlert(true);
    setTimeout(() => {
      setErrorMsg('');
      setShowAlert(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      setErrorMsg('');
    };
  }, []);
  return (
    <Center>
      <ImageBackground
        source={require('../assets/image/bg.png')}
        resizeMode="cover">
        <Stack pt={10} pb={4} h={'30%'} w={'100%'} justifyContent={'center'}>
          <Text
            fontSize={'2xl'}
            fontWeight={'bold'}
            color={'neutral.50'}
            px={10}>
            Login to Continue
          </Text>
          <Text
            fontSize={'md'}
            color={'neutral.50'}
            mt={1}
            mb={2}
            textAlign={'justify'}
            px={10}>
            Log in to your account and continue your learning journey in Koding
            Akademi.
          </Text>
        </Stack>
        <Stack
          borderTopRadius={30}
          bg={'neutral.50'}
          h={'70%'}
          w={'100%'}
          pt={5}>
          {showAlert && (
            <Alert
              status="danger"
              variant={'left-accent'}
              mx={10}
              borderRadius={8}>
              <HStack space={'12px'}>
                <Alert.Icon />
                <Text fontFamily={'Inter'} fontSize={'12px'}>
                  {errorMsg}
                </Text>
              </HStack>
            </Alert>
          )}
          <ScrollView showsVerticalScrollIndicator={false}>
            <FormLogin navigation={navigation} onError={handleError} />
            <HStack justifyContent={'center'} my={5}>
              <Text fontSize={'xs'}>Don't have an account? </Text>
              <Pressable onPress={() => navigation.replace('Register')}>
                <Text fontSize={'xs'} fontWeight={'bold'} color={'primary.500'}>
                  Register here!
                </Text>
              </Pressable>
            </HStack>
            <Text
              mb={5}
              textAlign={'center'}
              fontWeight={'thin'}
              fontSize={'xs'}
              color={'neutral.900'}
              opacity={0.5}>
              or continue with
            </Text>
            <Btn_Icon
              w={screenWidth}
              borderWidth={1}
              text={'Continue with Google'}
              padding={10}
              size={6}
              source={require('../assets/image/google.png')}
            />
          </ScrollView>
        </Stack>
      </ImageBackground>
    </Center>
  );
}

export default LoginScreen;
