import {HStack, Pressable, Stack, Text, View} from 'native-base';
import React, {useContext, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import Colors from '../theme/colors';
import {AuthContext} from '../controller/AuthContext';
import AlertInput from '../components/Alert/AlertInput';
import formatDate from '../controller/formatDate';

const Form = ({title, body, onPress, icon, shadow, borderWidth}) => {
  return (
    <Pressable onPress={onPress} w={'full'} alignItems={'center'}>
      <HStack
        borderWidth={borderWidth}
        borderColor={Colors.neutral[200]}
        px={'20px'}
        alignItems={'center'}
        justifyContent={'space-between'}
        bg={Colors.neutral[50]}
        h={'44px'}
        w={'90%'}
        borderRadius={'8px'}
        shadow={shadow}>
        <Text
          fontFamily={'Inter'}
          fontWeight={500}
          fontSize={'12px'}
          color={'neutral.700'}>
          {title}
        </Text>
        <HStack alignItems={'center'} space={'5px'}>
          <Text
            fontFamily={'Inter'}
            fontWeight={500}
            fontSize={'12px'}
            color={'neutral.900'}>
            {body}
          </Text>
          <Icon name={icon} size={18} color={'#191F25'} />
        </HStack>
      </HStack>
    </Pressable>
  );
};

const AccountScreen = ({navigation}) => {
  const {user} = useContext(AuthContext);
  const formattedDate = formatDate(user.birth_date);

  const [showAlertInput, setShowAlertInput] = useState(false);
  const [alertInputTitle, setAlertInputTitle] = useState('');
  const [alertInputLabel, setAlertInputLabel] = useState('');
  const [alertInputPlaceholder, setAlertInputPlaceholder] = useState('');

  const handlePressForm = (name, label, placeholder) => {
    setAlertInputTitle(name);
    setAlertInputLabel(label);
    setAlertInputPlaceholder(placeholder);
    setShowAlertInput(true);
  };

  const handleAlertClose = () => {
    setShowAlertInput(false);
  };

  return (
    <View flex={1} bg={Colors.neutral[50]}>
      <Stack space={'16px'} py={'10px'}>
        <Form borderWidth={1} title={'Email'} body={user.email} />
        <Form
          shadow={1}
          title={'Full Name'}
          body={user.full_name}
          onPress={() =>
            handlePressForm(
              'Change Full Name',
              'Full Name',
              'Input Your new full name',
            )
          }
        />
        <Form
          shadow={1}
          title={'Phone Number'}
          body={user.phone_number}
          onPress={() =>
            handlePressForm(
              'Change Phone Number',
              'Phone Number',
              'Input new phone number',
            )
          }
        />
        <Form
          shadow={1}
          title={'Address'}
          body={user.address}
          onPress={() =>
            handlePressForm('Change Address', 'Address', 'input new addres')
          }
        />
        <Form
          shadow={1}
          title={'Birth Date'}
          body={formattedDate}
          onPress={() =>
            handlePressForm(
              'Change Birth Date',
              'Birth Date',
              'input new birth day',
            )
          }
        />
        <Form
          shadow={1}
          title={'Reset Password'}
          onPress={() => navigation.navigate('ResetPass')}
        />
      </Stack>

      {showAlertInput && (
        <AlertInput
          handleAlertClose={handleAlertClose}
          name={alertInputTitle}
          label={alertInputLabel}
          placeholder={alertInputPlaceholder}
        />
      )}
    </View>
  );
};

export default AccountScreen;
