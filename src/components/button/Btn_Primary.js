import {Box, Pressable, Text} from 'native-base';
import React, {useState} from 'react';

const Btn_Primary = ({onPress, text, padding, w, pb}) => {
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
      px={padding}
      pb={pb}>
      <Box bg={boxBgColor} borderRadius={8} p={2}>
        <Text textAlign={'center'} color={'neutral.50'}>
          {text}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Btn_Primary;
