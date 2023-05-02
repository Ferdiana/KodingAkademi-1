import {Box, Pressable, Text} from 'native-base';
import React, {useState} from 'react';

const Btn_Outline = ({onPress, text, padding, w}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const boxBgColor = isPressed ? 'neutral.100' : 'neutral.50';
  const borderColor = isPressed ? 'neutral.200' : 'primary.500';

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      w={w}
      px={padding}>
      <Box
        borderRadius={10}
        p={2}
        borderWidth={1}
        borderColor={borderColor}
        bg={boxBgColor}>
        <Text textAlign={'center'} color={'primary.500'}>
          {text}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Btn_Outline;
