/* eslint-disable no-shadow */
import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {Center, Image} from 'native-base';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(userString => {
        if (userString) {
          const user = JSON.parse(userString);
          setUser(user);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [navigation]);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'https://kodingapp.refillaja.id/login',
        {
          email,
          password,
        },
      );
      const user = response.data.data;
      setUser(user);
      AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'home'}],
        }),
      );
    } catch (error) {
      console.error(error.response.data.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      if (!user?.refreshToken) {
        throw new Error('Refresh token not found.');
      }
      await axios.delete('https://kodingapp.refillaja.id/authentications', {
        data: {
          refreshToken: user.refreshToken,
        },
      });
      setUser(null);
      AsyncStorage.removeItem('user');
      navigation.navigate('OnBoarding');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await axios.put(
        'https://kodingapp.refillaja.id/authentications',
        {
          refreshToken: user.refreshToken,
        },
      );
      const newAccessToken = response.data.accessToken;
      setUser(prevUser => ({
        ...prevUser,
        accessToken: newAccessToken,
      }));
      AsyncStorage.setItem(
        'user',
        JSON.stringify({...user, accessToken: newAccessToken}),
      );
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  if (loading) {
    return (
      <Center flex={1}>
        <Image
          source={require('../assets/image/SplashScreen.png')}
          alt="logo"
          resizeMode={'cover'}
          h={'100%'}
          w={'100%'}
        />
      </Center>
    );
  }

  return (
    <AuthContext.Provider value={{user, login, logout, refreshToken}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};
