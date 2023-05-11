import React, {useState} from 'react';
import {
  Center,
  Text,
  Stack,
  ScrollView,
  HStack,
  Button,
  Checkbox,
} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {dataCoupon} from '../data/Cupon';
import Colors from '../theme/colors';
const CouponScreen = ({route}) => {
  const {selectedItems} = route.params;
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const navigation = useNavigation();

  const handleApplyCoupon = () => {
    const appliedCoupon = dataCoupon.find(item => item.id === selectedCoupon);

    const appliedCouponDiscount = appliedCoupon ? appliedCoupon.discount : 0;

    const updatedSelectedItems = selectedItems.map(item =>
      item.selected ? {...item, selected: true} : item,
    );

    navigation.navigate('Cart', {
      selectedItems: updatedSelectedItems,
      couponDiscount: appliedCouponDiscount,
    });

    setSelectedCoupon(appliedCoupon ? appliedCoupon.id : null);
  };

  return (
    <Stack flex={1} bg={Colors.neutral[50]}>
      <ScrollView>
        <Stack bgColor={'white'} px={'19'}>
          <Text fontWeight={'bold'} fontSize={20}>
            Choose an available coupon
          </Text>
          <Text fontWeight={'normal'} fontSize={16}>
            You can use the coupons available to save on your shopping!
          </Text>
          {dataCoupon.map(item => (
            <Stack bgColor={'white'} key={item.id}>
              <HStack py={'15px'}>
                <Center>
                  <Checkbox
                    accessibilityLabel="This is a dummy checkbox"
                    colorScheme="primary"
                    mr={15}
                    isChecked={selectedCoupon === item.id}
                    onChange={isChecked => {
                      setSelectedCoupon(isChecked ? item.id : null);
                    }}
                  />
                </Center>
                <Center
                  borderRadius={8}
                  borderWidth={1}
                  w={'90%'}
                  h={'57px'}
                  borderColor={
                    selectedCoupon === item.id
                      ? Colors.primary[500]
                      : 'gray.200'
                  }>
                  <Stack w={'full'} px={'19px'}>
                    <Text>Rp.{item.discount} discount</Text>
                    <Text>Ends in {item.dateLeft}</Text>
                  </Stack>
                </Center>
              </HStack>
            </Stack>
          ))}
        </Stack>
      </ScrollView>

      <Stack
        justifyContent={'flex-end'}
        pb={'10px'}
        w={'full'}
        h={'150'}
        px={'18'}
        bgColor={Colors.secondary[100]}>
        <HStack justifyContent={'space-between'}>
          <Stack>
            <Text fontWeight={'bold'} fontSize={16} color={'white'}>
              Total Discount
            </Text>
            <Text fontWeight={'bold'} fontSize={16} color={'white'}>
              <Text>
                Rp.
                {selectedCoupon !== null
                  ? dataCoupon.find(item => item.id === selectedCoupon)
                      ?.discount
                  : 0}
              </Text>
            </Text>
          </Stack>
          <Stack>
            <Button
              py={'3'}
              px={'42'}
              bgColor={Colors.primary[500]}
              onPress={handleApplyCoupon}>
              <Text color={'white'}>Apply</Text>
            </Button>
          </Stack>
        </HStack>
      </Stack>
    </Stack>
  );
};

export default CouponScreen;
