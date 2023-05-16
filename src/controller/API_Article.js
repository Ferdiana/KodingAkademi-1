import axios from 'axios';
import {API_URL} from '@env';

const API_Article = async accessToken => {
  try {
    const response = await axios.get(`${API_URL}/user/articles`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(error.response.data);
    return [];
  }
};
export {API_Article};
