/* eslint-disable react/no-unstable-nested-components */
import {HStack, Pressable, Stack, Text, View} from 'native-base';
import React, {useContext} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../theme/colors';
import {AuthContext} from '../controller/AuthContext';

const AccountScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);

  const Form = ({title, body, onPress, icon}) => {
    return (
      <Pressable onPress={onPress} w={'full'} alignItems={'center'}>
        <HStack
          px={'20px'}
          alignItems={'center'}
          justifyContent={'space-between'}
          bg={Colors.neutral[50]}
          h={'40px'}
          w={'90%'}
          borderRadius={'8px'}
          borderWidth={1}
          borderColor={Colors.success[50]}
          shadow={1}>
          <Text
            fontFamily={'Inter'}
            fontWeight={500}
            fontSize={'12px'}
            color={'neutral.700'}>
            {title}
          </Text>
          <HStack alignItems={'center'} space={'5px'}>
            <Text
              fontFamily={'Inter'}
              fontWeight={500}
              fontSize={'12px'}
              color={'neutral.900'}>
              {body}
            </Text>
            <Icon name={icon} size={18} color={'#191F25'} />
          </HStack>
        </HStack>
      </Pressable>
    );
  };
  return (
    <View flex={1} bg={Colors.neutral[50]}>
      <Stack space={'16px'} py={'10px'}>
        <Form title={'Full Name'} body={user.full_name} />
        <Form title={'Email'} body={user.email} />
        <Form
          title={'Phone Number'}
          body={user.phone_number}
          icon={'right'}
          onPress={() => navigation.navigate('AddPhoneNumber')}
        />
        <Form
          title={'Reset Password'}
          icon={'right'}
          onPress={() => navigation.navigate('ResetPass')}
        />
      </Stack>
    </View>
  );
};

export default AccountScreen;
