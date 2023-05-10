import React from 'react';
import QRComponent from '../components/QR/QRComponent';
import {Avatar, Center, Text, Stack} from 'native-base';
import {useContext} from 'react';
import {AuthContext} from '../controller/AuthContext';
import Colors from '../theme/colors';

const QRDetailScreen = () => {
  const {user} = useContext(AuthContext);
  const username = user.full_name;
  const initial = username.charAt(0).toUpperCase();

  return (
    <Stack alignItems={'center'} flex={1} bg={Colors.neutral[50]} py={'10px'}>
      <Stack alignItems={'center'} mb={'40px'}>
        <Avatar size={'74px'} bg={Colors.secondary[300]}>
          <Text
            fontFamily={'Inter'}
            fontWeight={600}
            fontSize={'36px'}
            color={Colors.neutral[50]}>
            {initial}
          </Text>
        </Avatar>
        <Text
          mt={'10px'}
          color={Colors.neutral[700]}
          fontFamily={'Inter'}
          fontWeight={600}
          fontSize={'20px'}>
          {user.full_name}
        </Text>
      </Stack>
      <Stack
        borderWidth={4}
        borderColor={Colors.secondary[300]}
        borderRadius={8}>
        <Stack background={'neutral.50'} p={2} borderRadius={8}>
          <QRComponent size={200} />
        </Stack>
      </Stack>
    </Stack>
  );
};
export default QRDetailScreen;
