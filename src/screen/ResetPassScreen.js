import {FormControl, Input, Stack, Text} from 'native-base';
import React, {useState} from 'react';
import {Btn_Primary} from '../components';
import {Dimensions} from 'react-native';

const screenWidth = Dimensions.get('window').width;

const ResetPassScreen = () => {
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
          color={'primary.500'}>
          Create new password
        </Text>
        <Text
          fontFamily={'Inter'}
          fontWeight={500}
          fontSize={'sm'}
          color={'neutral.500'}
          mb={2}>
          Your new password must be different from previous used passwords.
        </Text>
      </Stack>
      <Stack space={5}>
        <FormControl>
          {/* <Stack space={1} px={5}>
            <FormControl.Label>Old Password</FormControl.Label>
            <Input
              bgColor={'transparent'}
              borderColor={'neutral.100'}
              focusOutlineColor={'primary.500'}
              borderRadius={10}
              variant={'outline'}
              p={2}
              value={email}
              onChangeText={setEmail}
              placeholder={'Enter your old password'}
            />
          </Stack> */}
          <Stack space={1} px={5}>
            <FormControl.Label>New Password</FormControl.Label>
            <Input
              bgColor={'transparent'}
              borderColor={'neutral.100'}
              focusOutlineColor={'primary.500'}
              borderRadius={10}
              variant={'outline'}
              p={2}
              value={email}
              onChangeText={setEmail}
              placeholder={'Enter your new password'}
            />
          </Stack>
          <Stack space={1} px={5}>
            <FormControl.Label>Confirm New Password</FormControl.Label>
            <Input
              bgColor={'transparent'}
              borderColor={'neutral.100'}
              focusOutlineColor={'primary.500'}
              borderRadius={10}
              variant={'outline'}
              p={2}
              value={email}
              onChangeText={setEmail}
              placeholder={'Re-enter your new password'}
            />
          </Stack>
        </FormControl>
        <Btn_Primary
          w={screenWidth}
          text={'Reset Password'}
          padding={5}
          onPress={handleSubmit}
        />
      </Stack>
    </Stack>
  );
};
export default ResetPassScreen;
