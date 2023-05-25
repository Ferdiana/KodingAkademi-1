import React, {useState, useContext, useEffect} from 'react';
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
import Colors from '../theme/colors';
import {AuthContext} from '../controller/AuthContext';
import API_Coupon from '../controller/API_Coupon';

const CouponScreen = ({route}) => {
  const {selectedItems, totalPrice, numSelectedItems, fromScreen} =
    route.params;
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);
  const [coupon, setCoupon] = useState([]);

  useEffect(() => {
    const loadCoupon = async () => {
      if (user.accessToken && selectedItems.length > 0) {
        const response = await API_Coupon(
          user.accessToken,
          selectedItems[0].id,
        );
        setCoupon(response);
      }
    };
    loadCoupon();
  }, [user.accessToken, selectedItems]);

  const handleApplyCoupon = () => {
    const appliedCoupon = coupon.find(item => item.id === selectedCoupon);
    const appliedCouponDiscount = appliedCoupon ? appliedCoupon.discount : 0;
    const updatedDiscountedPrice = totalPrice - appliedCouponDiscount;
    const updatedSelectedItems = selectedItems.map(item =>
      item.selected ? {...item, selected: true} : item,
    );
    if (fromScreen === 'Cart') {
      navigation.navigate('Cart', {
        selectedItems: updatedSelectedItems,
        couponDiscount: appliedCouponDiscount,
        totalPrice: totalPrice,
        numSelectedItems: numSelectedItems,
        discountedPrice:
          updatedDiscountedPrice < 0 ? 0 : updatedDiscountedPrice,
      });
    } else {
      navigation.navigate('Checkout', {
        selectedItems: updatedSelectedItems,
        couponDiscount: appliedCouponDiscount,
        totalPrice: totalPrice,
        numSelectedItems: numSelectedItems,
        discountedPrice:
          updatedDiscountedPrice < 0 ? 0 : updatedDiscountedPrice,
      });
    }
    setSelectedCoupon(appliedCoupon ? appliedCoupon.id : null);
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <Stack flex={1} bg={Colors.neutral[50]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Stack bgColor={'white'} px={'19'}>
          <Text fontWeight={'bold'} fontSize={20}>
            Choose an available coupon
          </Text>
          <Text fontWeight={'normal'} fontSize={16}>
            You can use the coupons available to save on your shopping!
          </Text>
          {coupon.map(item => {
            const formattedDate = formatDate(item.coupon_end);
            return (
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
                      <Text>
                        {`Rp${item.discount.toLocaleString('id-ID')}`} discount
                      </Text>
                      <Text>Ends in {formattedDate}</Text>
                    </Stack>
                  </Center>
                </HStack>
              </Stack>
            );
          })}
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
                Rp
                {selectedCoupon !== null
                  ? coupon
                      .find(item => item.id === selectedCoupon)
                      ?.discount.toLocaleString('id-ID')
                  : '0'}
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
