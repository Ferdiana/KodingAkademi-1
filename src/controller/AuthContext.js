import React, {createContext, useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {API_KEY} from '@env';

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
      const response = await axios.post(`${API_KEY}/login`, {
        email,
        password,
      });
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
      await axios.delete(`${API_KEY}/authentications`, {
        data: {
          refreshToken: user.refreshToken,
        },
      });
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
