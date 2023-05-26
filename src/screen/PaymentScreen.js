import {Stack, Text} from 'native-base';
import React from 'react';
import {Btn_Outline, Btn_Primary} from '../components';
import Colors from '../theme/colors';

const PaymentScreen = ({route, navigation}) => {
  const {total} = route.params;
  return (
    <Stack flex={1} py={'10px'} px={'18px'} bg={Colors.neutral[50]}>
      <Stack space={'10px'} mb={'30px'}>
        <Text
          fontFamily={'Inter'}
          fontWeight={600}
          fontSize={'20px'}
          lineHeight={'26px'}
          color={Colors.secondary[50]}>
          You will be redirected to the Xendit Payment Page.
        </Text>
        <Text
          fontFamily={'Inter'}
          fontWeight={400}
          fontSize={'12px'}
          textAlign={'justify'}
          color={Colors.neutral[900]}>
          Thank you for choosing Koding Akademi as your learning partner. Your
          payment will continue on the Xendit payment page. Please make a
          payment of {total}
        </Text>
      </Stack>
      <Btn_Primary
        text={'Check Payment Status'}
        pb={'15px'}
        onPress={() => navigation.navigate('Transactions')}
      />
      <Btn_Outline
        text={'Back to Home'}
        onPress={() => navigation.replace('home')}
      />
    </Stack>
  );
};
export default PaymentScreen;
