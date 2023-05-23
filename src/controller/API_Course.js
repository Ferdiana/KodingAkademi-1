import axios from 'axios';
import {API_URL, API_KEY} from '@env';

const API_Course = async accessToken => {
  try {
    const response = await axios.get(
      'https://kodingapp.refillaja.id/user/courses',
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

const API_DetailCourse = async (id, accessToken) => {
  try {
    const response = await axios.get(
      `https://kodingapp.refillaja.id/user/courses/${id}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    console.error(error.response.data);
    return null;
  }
};

export {API_Course, API_DetailCourse};
