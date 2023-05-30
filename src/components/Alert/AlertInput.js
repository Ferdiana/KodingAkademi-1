import React from 'react';
import {FormControl, Input, Button, Modal} from 'native-base';

export default function AlertInput({
  handleAlertClose,
  name,
  label,
  placeholder,
}) {
  return (
    <Modal isOpen={true} onClose={handleAlertClose}>
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>{name}</Modal.Header>
        <Modal.Body>
          <FormControl>
            <FormControl.Label>{label}</FormControl.Label>
            <Input placeholder={placeholder} />
          </FormControl>
        </Modal.Body>
        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={handleAlertClose}>
              Cancel
            </Button>
            <Button onPress={handleAlertClose}>Save</Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  );
}
