import axios from 'axios';
import {API_URL, API_KEY} from '@env';

const API_Article = async accessToken => {
  try {
    const response = await axios.get(`${API_KEY}/user/articles`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return [];
  }
};

const API_ArticleLimit = async accessToken => {
  try {
    const response = await axios.get(`${API_KEY}/user/articles?limit=5`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return [];
  }
};

const API_ArticleDetail = async (id, accessToken) => {
  try {
    const response = await axios.get(`${API_KEY}/user/articles/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(error.response.data);
    return null;
  }
};
export {API_Article, API_ArticleDetail, API_ArticleLimit};
