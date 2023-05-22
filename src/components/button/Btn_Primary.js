import {Box, Pressable, Text} from 'native-base';
import React, {useState} from 'react';

const Btn_Primary = ({onPress, text, padding, w, pb, disabled, d}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const boxBgColor = isPressed
    ? 'primary.700'
    : disabled
    ? 'primary.50'
    : 'primary.500';

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      w={w}
      px={padding}
      pb={pb}>
      <Box
        bg={boxBgColor}
        h={'46px'}
        borderRadius={8}
        p={2}
        justifyContent={'center'}>
        <Text
          textAlign={'center'}
          color={disabled ? 'neutral.50' : 'neutral.50'}>
          {text}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Btn_Primary;
