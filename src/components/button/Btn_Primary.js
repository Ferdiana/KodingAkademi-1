import {Box, Pressable, Text} from 'native-base';
import React, {useState} from 'react';

const Btn_Primary = ({onPress, text, padding, w}) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePressIn = () => {
    setIsPressed(true);
  };

  const handlePressOut = () => {
    setIsPressed(false);
  };

  const boxBgColor = isPressed ? 'primary.700' : 'primary.500';

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      w={w}
      px={padding}>
      <Box bg={boxBgColor} borderRadius={10} p={2}>
        <Text textAlign={'center'} color={'neutral.50'}>
          {text}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Btn_Primary;
