import {Center, HStack, Pressable, ScrollView, Stack, Text} from 'native-base';
import React from 'react';
import {FormRegister} from '../components';

function RegisterScreen({navigation}) {
  return (
    <Center bg={'primary.500'} justifyContent={'center'} alignItems={'center'}>
      <Stack h={'20%'} w={'100%'} justifyContent={'center'} px={10} py={2}>
        <Text fontSize={'2xl'} fontWeight={'bold'} color={'neutral.50'}>
          Create Account
        </Text>
        <Text fontSize={'md'} color={'neutral.50'} textAlign={'justify'}>
          Register an account and join Koding Akademi.
        </Text>
      </Stack>
      <Stack h={'80%'} bg={'neutral.50'} borderTopRadius={30} pt={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <FormRegister navigation={navigation} />
          <HStack my={2} justifyContent={'center'}>
            <Text fontSize={'xs'}>Already have an account? </Text>
            <Pressable onPress={() => navigation.replace('Login')}>
              <Text fontSize={'xs'} fontWeight={'bold'} color={'primary.500'}>
                Login here!
              </Text>
            </Pressable>
          </HStack>
        </ScrollView>
      </Stack>
    </Center>
  );
}

export default RegisterScreen;
