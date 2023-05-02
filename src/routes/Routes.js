import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import OnBoardingScreen from '../screen/OnBoardingScreen';
import BottomNavigation from './BottomNavigation';
import LoginScreen from '../screen/LoginScreen';
import RegisterScreen from '../screen/RegisterScreen';
import ArticleScreen from '../screen/ArticleScreen';
import ForgotPassScreen from '../screen/ForgotPassScreen';
import ResetPassScreen from '../screen/ResetPassScreen';
import PromoDetailScreen from '../screen/PromoDetailScreen';
import QRDetailScreen from '../screen/QRDetailScreen';
import AccountScreen from '../screen/AccountScreen';
import AddPhoneNumberScreen from '../screen/AddPhoneNumberScreen';
import CartScreen from '../screen/CartSreen';
import MyCourseScreen from '../screen/MyCourseScreen';
import TransactionsScreen from '../screen/TransactionsScreen';
import EventScreen from '../screen/EventScreen';
import EventFinishedDetailScreen from '../screen/EventFinishedDetailScreen';
import EventFreeDetailScreen from '../screen/EventFreeDetailScreen';

const Stack = createNativeStackNavigator();

function Routes() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          height: 54,
          backgroundColor: '#FFFFFF',
        },
        headerTitleStyle: {
          fontSize: 14,
          fontFamily: 'Inter',
          fontWeight: '700',
          color: '#191F25',
        },
      }}>
      <Stack.Screen
        name="OnBoarding"
        component={OnBoardingScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="home"
        component={BottomNavigation}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Article"
        component={ArticleScreen}
        options={{title: 'All Article'}}
      />
      <Stack.Screen
        name="ForgotPass"
        component={ForgotPassScreen}
        options={{
          title: 'Forgot Password',
        }}
      />
      <Stack.Screen
        name="ResetPass"
        component={ResetPassScreen}
        options={{
          title: 'Reset Password',
        }}
      />
      <Stack.Screen
        name="PromoDetail"
        component={PromoDetailScreen}
        options={() => ({
          title: 'Course Detail',
        })}
      />
      <Stack.Screen
        name="QRDetail"
        component={QRDetailScreen}
        options={{title: 'QR Code'}}
      />
      <Stack.Screen name="Account" component={AccountScreen} options={{}} />
      <Stack.Screen
        name="AddPhoneNumber"
        component={AddPhoneNumberScreen}
        options={{title: 'Add Phone Number'}}
      />
      <Stack.Screen
        name="MyCourse"
        component={MyCourseScreen}
        options={{title: 'My Courses '}}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{title: 'Cart'}}
      />
      <Stack.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{title: 'Transactions'}}
      />
      <Stack.Screen
        name="Event"
        component={EventScreen}
        options={{title: 'Transactions'}}
      />
      <Stack.Screen
        name="EventFinishedDetail"
        component={EventFinishedDetailScreen}
        options={{title: 'Event Detail'}}
      />
      <Stack.Screen
        name="EventFreeDetail"
        component={EventFreeDetailScreen}
        options={{title: 'Event Detail'}}
      />
    </Stack.Navigator>
  );
}

export default Routes;
