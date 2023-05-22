import axios from 'axios';
import {API_URL, API_KEY} from '@env';

const API_GetCart = async accessToken => {
  try {
    const response = await axios.get('http://192.168.1.17:3000/user/cart', {
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

const API_DeleteCart = async (accessToken, productLists) => {
  try {
    const response = await axios.delete('http://192.168.1.17:3000/user/cart', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      data: {productLists},
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const API_AddCart = async (accessToken, productId) => {
  try {
    const response = await axios.post(
      'http://192.168.1.17:3000/user/cart',
      {productId},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export {API_GetCart, API_DeleteCart, API_AddCart};
