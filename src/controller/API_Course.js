import axios from 'axios';
import {API_KEY} from '@env';

export const API_Course = async accessToken => {
  try {
    const response = await axios.get(
      'https://2358-103-157-49-64.ngrok-free.app/user/courses',
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
