import {FormControl, Input, Stack, Text} from 'native-base';
import React, {useState} from 'react';
import {Btn_Primary} from '../components';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ForgotPassScreen = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    // await login(email, password);
    // navigation.replace('home');
  };

  return (
    <Stack flex={1} bg={'neutral.50'}>
      <Stack px={5}>
        <Text
          mt={2}
          fontFamily={'Inter'}
          fontWeight={700}
          fontSize={'2xl'}
          color={'secondary.50'}>
          Forgot Password
        </Text>
        <Text
          fontFamily={'Inter'}
          fontWeight={500}
          fontSize={'sm'}
          color={'neutral.500'}
          mb={2}>
          Enter your registered email. We will send you a verification code to
          reset your password.
        </Text>
      </Stack>
      <Stack space={5}>
        <FormControl>
          <Stack space={1} px={5}>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              bgColor={'transparent'}
              borderColor={'neutral.100'}
              focusOutlineColor={'primary.500'}
              borderRadius={10}
              variant={'outline'}
              p={2}
              value={email}
              onChangeText={setEmail}
              placeholder={'Enter your email address'}
            />
          </Stack>
        </FormControl>
        <Btn_Primary
          w={screenWidth}
          text={'Submit'}
          padding={5}
          onPress={handleSubmit}
        />
      </Stack>
    </Stack>
  );
};
export default ForgotPassScreen;
