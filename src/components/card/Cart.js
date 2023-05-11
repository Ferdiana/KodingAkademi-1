import React from 'react';
import {Stack, HStack, Text, Checkbox, Image, Pressable} from 'native-base';
import Colors from '../../theme/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CartCard = ({
  item,
  onSelectItem,
  onDeleteItem,
  hideCheckboxAndIcon,
  selected,
  WImage,
  WText,
}) => {
  return (
    <Stack bg={Colors.neutral[50]} px={'18px'}>
      <HStack py={'15px'} space={'15px'} alignItems={'center'}>
        {!hideCheckboxAndIcon && (
          <Checkbox
            value="test"
            isChecked={selected}
            accessibilityLabel="This is a dummy checkbox"
            colorScheme="primary"
            onChange={() => onSelectItem(item)}
          />
        )}
        <Image
          source={{uri: item.image}}
          w={WImage}
          h={'80px'}
          alt={'image'}
          borderRadius={10}
        />
        <Stack
          w={WText}
          h={'80px'}
          space={'4px'}
          justifyContent={'space-between'}>
          <Text
            numberOfLines={2}
            fontFamily={'Inter'}
            fontWeight={600}
            fontSize={'12px'}>
            {item.title}
          </Text>
          <HStack justifyContent={'space-between'} alignItems={'center'}>
            <Stack>
              <Text
                fontFamily={'Inter'}
                fontWeight={500}
                fontSize={'12px'}
                color={Colors.neutral[900]}>
                Rp{item.price}
              </Text>
              <Text
                strikeThrough={true}
                fontFamily={'Inter'}
                fontWeight={500}
                fontSize={'12px'}
                color={Colors.neutral[400]}>
                Rp{item.price}
              </Text>
            </Stack>
            {!hideCheckboxAndIcon && (
              <Pressable pr={'8px'} onPress={() => onDeleteItem(item.id)}>
                <Icon name="delete" size={28} color={'red'} />
              </Pressable>
            )}
          </HStack>
        </Stack>
      </HStack>
    </Stack>
  );
};

export default CartCard;
