import axios from 'axios';
import {AuthContext} from './AuthContext';
import {useContext} from 'react';
import {API_URL} from '@env';

const API_Course = async () => {
  const {user} = useContext(AuthContext);

  try {
    const response = await axios.get(`${API_URL}/user/courses`, {
      headers: {Authorization: 'Bearer' + `${user.accessToken}`},
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
  }
};

export default API_Course;
