import React from 'react';
import QRComponent from '../components/QR/QRComponent';
import {Avatar, Center, Text, Stack} from 'native-base';
import {useContext} from 'react';
import {AuthContext} from '../controller/AuthContext';

const QRDetailScreen = () => {
  const {user} = useContext(AuthContext);
  const username = user.full_name;
  const initial = username.charAt(0).toUpperCase();

  return (
    <Center my={5}>
      <Stack space={2} alignItems={'center'} mb={10}>
        <Avatar size={'74px'} bg={'primary.50'}>
          <Text fontFamily={'Inter'} fontWeight={600} fontSize={'36px'}>
            {initial}
          </Text>
        </Avatar>
        <Text fontFamily={'Inter'} fontWeight={600} fontSize={'20px'}>
          {user.full_name}
        </Text>
      </Stack>
      <Stack bg={'primary.50'} p={3} borderRadius={8}>
        <Stack background={'neutral.50'} p={2} borderRadius={8}>
          <QRComponent size={200} />
        </Stack>
      </Stack>
    </Center>
  );
};
export default QRDetailScreen;
