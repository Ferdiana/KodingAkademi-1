import React, {createContext, useState} from 'react';
import axios from 'axios';
import {API_KEY} from '@env';
import {useContext} from 'react';
import {AuthContext} from './AuthContext';

const CoursContext = createContext();

const CoursProvider = ({children}) => {
  const {user} = useContext(AuthContext);

  const [course, setCourse] = useState(null);

  const API_Course = async () => {
    try {
      const response = await axios.get(`${API_KEY}/user/courses`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
      setCourse(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  return (
    <CoursContext.Provider value={{course, API_Course}}>
      {children}
    </CoursContext.Provider>
  );
};

export {CoursProvider, CoursContext};
