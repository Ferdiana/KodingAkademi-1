import React from 'react';
import {Text, Button, HStack, AlertDialog} from 'native-base';

export default function AlertDialogg({
  handleAlertClose,
  alertText,
  displayTwoButtons,
  onPress,
}) {
  return (
    <AlertDialog
      isOpen={true}
      leastDestructiveRef={null}
      onClose={handleAlertClose}
      motionPreset="fade">
      <AlertDialog.Content p={5}>
        <Text alignSelf={'center'} pb={3}>
          {alertText}
        </Text>
        <HStack justifyContent={'space-evenly'}>
          {displayTwoButtons ? (
            <>
              <Button px={8} colorScheme="primary" onPress={handleAlertClose}>
                Cancel
              </Button>

              <Button
                px={8}
                colorScheme="primary"
                variant={'outline'}
                onPress={onPress}>
                Logout
              </Button>
            </>
          ) : (
            <Button px={8} colorScheme="primary" onPress={onPress}>
              Login
            </Button>
          )}
        </HStack>
      </AlertDialog.Content>
    </AlertDialog>
  );
}
