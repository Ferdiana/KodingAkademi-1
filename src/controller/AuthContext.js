import React, {createContext, useState} from 'react';
import axios from 'axios';
import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const AuthContext = createContext();

const AuthProvider = ({children}) => {
  const navigation = useNavigation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem('user')
      .then(userString => {
        if (userString) {
          setUser(JSON.parse(userString));
        }
      })
      .catch(error => console.error(error));
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post(
        'https://9b0b-103-157-49-76.ngrok-free.app/login',
        {
          email,
          password,
        },
      );
      setUser(response.data.data);
      console.log(response.data.data);
      navigation.navigate('home');
      AsyncStorage.setItem('user', JSON.stringify(response.data.data));
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const logout = async () => {
    try {
      await axios.delete(
        'https://9b0b-103-157-49-76.ngrok-free.app/authentications',
        {
          data: {
            refreshToken: user.refreshToken,
          },
        },
      );
      setUser(null);
      AsyncStorage.removeItem('user');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <AuthContext.Provider value={{user, login, logout}}>
      {children}
    </AuthContext.Provider>
  );
};

export {AuthProvider, AuthContext};
