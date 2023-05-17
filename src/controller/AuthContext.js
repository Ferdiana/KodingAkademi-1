/* eslint-disable no-shadow */
import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {Center, Image} from 'native-base';
import {API_URL, API_KEY} from '@env';

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
      const response = await axios.post(`${API_KEY}/login`, {
        email,
        password,
      });
      const user = response.data.data;
      setUser(user);
      AsyncStorage.setItem('user', JSON.stringify(user));
      navigation.navigate('home');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      if (!user?.refreshToken) {
        throw new Error('Refresh token not found.');
      }
      await axios.delete(`${API_KEY}/authentications`, {
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
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};
