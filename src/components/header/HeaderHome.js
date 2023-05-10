import React, {useContext} from 'react';
import {Text, HStack, VStack, Pressable, Button, Image} from 'native-base';
import {customTheme} from '../../theme';
import Icon from 'react-native-vector-icons/Feather';
import QRComponent from '../QR/QRComponent';
import {AuthContext} from '../../controller/AuthContext';
import {ImageBackground} from 'react-native';

const iconColor = customTheme.colors.neutral[50];

const HeaderHome = ({navigation}) => {
  const {user} = useContext(AuthContext);

  return (
    <VStack>
      <ImageBackground
        source={require('../../assets/image/bg.png')}
        resizeMode="cover">
        <VStack px={'5%'} pt={2}>
          <HStack alignItems={'center'} justifyContent={'space-between'}>
            <VStack>
              <Text color={'neutral.50'} fontSize={'xl'} fontWeight={700}>
                Hello,{user.full_name}
              </Text>
              <Text color={'neutral.50'} fontSize={'md'}>
                What do you want to learn?
              </Text>
            </VStack>
            <Pressable onPress={() => navigation.navigate('Cart')}>
              <Icon name="shopping-cart" color={iconColor} size={24} />
            </Pressable>
          </HStack>
          <Pressable onPress={() => navigation.navigate('QRDetail')}>
            <HStack
              my={5}
              bg={'neutral.50'}
              px={5}
              py={2}
              borderRadius={10}
              space={4}
              alignItems={'center'}>
              <QRComponent size={80} />
              <VStack space={1}>
                <Text>
                  Status: {''}
                  <Text color={'primary.500'}>Active</Text>
                </Text>
                <Text>Until 30 Desember 2023</Text>
              </VStack>
            </HStack>
          </Pressable>
        </VStack>
      </ImageBackground>
    </VStack>
  );
};
export default HeaderHome;
