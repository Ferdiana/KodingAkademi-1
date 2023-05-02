import React from 'react';
import {
  HStack,
  Text,
  Checkbox,
  Image,
  Stack,
  Center,
  Divider,
  IconButton,
} from 'native-base';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../../theme/colors';

const Cart = ({item, removeFromCart}) => {
  return (
    <Stack bgColor={'white'}>
      <HStack py={'15px'}>
        <Center px={'19px'}>
          <Checkbox
            value="test"
            accessibilityLabel="This is a dummy checkbox"
            colorScheme="orange"
          />
        </Center>
        <Center pr={'15px'}>
          <Image
            source={{uri: item.image}}
            w={'120px'}
            h={'80px'}
            alt={'image'}
            borderRadius={10}
          />
        </Center>
        <Center>
          <Stack w={'200'}>
            <Text fontWeight={'bold'}>{item.title}</Text>
            <Text>{item.category}</Text>
            <Text>Rp.{item.priceNew}</Text>

            <IconButton
              alignSelf={'flex-end'}
              p={-10}
              icon={<Icon name="delete" color="red" size={24} />}
            />
          </Stack>
        </Center>
      </HStack>
      <Divider
        _light={{
          bg: Colors.neutral[100],
        }}
        _dark={{
          bg: 'muted.50',
        }}
        h={1}
      />
    </Stack>
  );
};

export default Cart;
