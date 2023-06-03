/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import CourseScreen from '../screen/CourseScreen';
import PromoScreen from '../screen/EventScreen';
import ProfileScreen from '../screen/ProfileScreen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShadowVisible: false,
        headerTitleAlign: 'center',
        headerStyle: {
          height: 54,
          backgroundColor: '#0B2347',
        },
        headerTitleStyle: {
          fontSize: 14,
          fontFamily: 'Inter',
          fontWeight: 700,
          color: '#fff',
        },
        tabBarActiveTintColor: '#0B2347',
        tabBarInactiveTintColor: '#5D7389',
        tabBarStyle: [{display: 'flex'}, null],
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialCommunityIcons
                name="home-variant"
                size={28}
                color={'#0B2347'}
              />
            ) : (
              <MaterialCommunityIcons
                name="home-variant-outline"
                size={28}
                color={'#5D7389'}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Course"
        component={CourseScreen}
        options={{
          headerShown: false,
          title: 'All Course',
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialCommunityIcons
                name="book-open"
                size={28}
                color={'#0B2347'}
              />
            ) : (
              <MaterialCommunityIcons
                name="book-open-outline"
                size={28}
                color={'#5D7389'}
              />
            ),
        }}
      />
      <Tab.Screen
        name="Event"
        component={PromoScreen}
        options={{
          headerShown: false,
          title: 'All Event',
          tabBarIcon: ({focused}) =>
            focused ? (
              <FontAwesome5 name="percentage" size={28} color={'#0B2347'} />
            ) : (
              <Feather name="percent" size={28} color={'#5D7389'} />
            ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) =>
            focused ? (
              <MaterialIcons name="person" size={28} color={'#0B2347'} />
            ) : (
              <MaterialIcons
                name="person-outline"
                size={28}
                color={'#5D7389'}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomNavigation;
