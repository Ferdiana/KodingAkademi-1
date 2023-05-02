import {Center, HStack, Pressable, Stack, Text} from 'native-base';
import React from 'react';
import {Btn_Icon, FormLogin} from '../components';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

function LoginScreen({navigation}) {
  return (
    <Center bg={'primary.500'}>
      <Stack pt={10} pb={4} h={'30%'} w={'100%'} justifyContent={'center'}>
        <Text fontSize={'2xl'} fontWeight={'bold'} color={'neutral.50'} px={10}>
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
        alignItems={'center'}
        space={5}
        pt={5}>
        <FormLogin navigation={navigation} />
        <HStack>
          <Text fontSize={'xs'}>Don't have an account? </Text>
          <Pressable onPress={() => navigation.replace('Register')}>
            <Text fontSize={'xs'} fontWeight={'bold'} color={'primary.500'}>
              Register here!
            </Text>
          </Pressable>
        </HStack>
        <Text
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
      </Stack>
    </Center>
  );
}

export default LoginScreen;
