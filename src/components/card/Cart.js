import React from 'react';
import {
  Stack,
  HStack,
  Text,
  Checkbox,
  Image,
  Center,
  Divider,
  IconButton,
  Pressable,
} from 'native-base';
import Colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import Btn_Icon from '../button/Btn_Icon';

const CartCard = ({item, onSelectItem, onDeleteItem, hideCheckboxAndIcon}) => {
  return (
    <Stack bgColor={'white'}>
      <HStack py={'15px'}>
        {!hideCheckboxAndIcon && (
          <Center px={'19px'}>
            <Checkbox
              value="test"
              accessibilityLabel="This is a dummy checkbox"
              colorScheme="primary"
              onChange={() => onSelectItem(item)}
            />
          </Center>
        )}
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
            <Text>Rp.{item.price}</Text>
            {!hideCheckboxAndIcon && (
              <IconButton
                bgColor={'transparent'}
                icon={<Icon name="delete" color="red" size={24} />}
                onPress={() => onDeleteItem(item.id)} // Call onDeleteItem with item.id
              />
            )}
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

export default CartCard;
