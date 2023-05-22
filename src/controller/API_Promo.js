import axios from 'axios';
import {API_URL, API_KEY} from '@env';

const API_Promo = async accessToken => {
  try {
    const response = await axios.get(
      'http://192.168.1.17:3000/user/courses?promo=true',
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

const API_PromoLimit = async accessToken => {
  try {
    const response = await axios.get(
      'http://192.168.1.17:3000/user/courses?promo=true&limit=3',
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

export {API_Promo, API_PromoLimit};
