import axios from 'axios';
import {API_URL} from '@env';

const API_Promo = async accessToken => {
  try {
    const response = await axios.get(`${API_URL}/user/courses?promo=true`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error(error.response.data);
    return [];
  }
};

export default API_Promo;
