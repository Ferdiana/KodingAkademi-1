import axios from 'axios';
import {API_URL, API_KEY} from '@env';

const API_Article = async accessToken => {
  try {
    const response = await axios.get(
      'https://kodingapp.refillaja.id/user/articles',
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

const API_ArticleLimit = async accessToken => {
  try {
    const response = await axios.get(
      'https://kodingapp.refillaja.id/user/articles?limit=5',
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

const API_ArticleDetail = async (id, accessToken) => {
  try {
    const response = await axios.get(
      `http://192.168.1.17:3000/user/articles/${id}`,
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
export {API_Article, API_ArticleDetail, API_ArticleLimit};
