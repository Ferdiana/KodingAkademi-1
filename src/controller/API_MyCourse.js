import axios from 'axios';
import {API_URL, API_KEY} from '@env';

const API_MyCourse = async accessToken => {
  try {
    const response = await axios.get(
      'http://192.168.1.17:3000/user/user-products/courses',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error(error.response.data);
    return [];
  }
};

export {API_MyCourse};
