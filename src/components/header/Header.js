import {Pressable, Text, ZStack} from 'native-base';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Header = ({navigation, text}) => {
  return (
    <ZStack h={'54px'} bg={'secondary.500'} justifyContent={'center'} px={5}>
      <Text
        ml={5}
        w={'100%'}
        color={'neutral.50'}
        textAlign={'center'}
        fontFamily={'Inter'}
        fontWeight={700}>
        {text}
      </Text>
      <Pressable
        onPress={() => navigation.goBack()}
        h={'100%'}
        justifyContent={'center'}
        ml={5}>
        <MaterialIcons name="arrow-back-ios" size={28} color={'white'} />
      </Pressable>
    </ZStack>
  );
};

export default Header;
