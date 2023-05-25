import React from 'react';
import {Text, Button, HStack, AlertDialog} from 'native-base';

export default function AlertLogout({handleAlertClose, onPress}) {
  return (
    <AlertDialog
      isOpen={true}
      leastDestructiveRef={null}
      onClose={handleAlertClose}
      motionPreset="fade">
      <AlertDialog.Content p={5}>
        <Text alignSelf={'center'} pb={'20px'}>
          Are you sure you want to logout?
        </Text>
        <HStack justifyContent={'space-evenly'}>
          <Button px={8} colorScheme="primary" onPress={handleAlertClose}>
            Cancel
          </Button>
          <Button
            variant={'outline'}
            onPressIn={onPress}
            px={8}
            colorScheme="primary"
            onPress={() => console.log('Logout')}>
            Logout
          </Button>
        </HStack>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
