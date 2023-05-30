import axios from 'axios';

const API_Profile = async accessToken => {
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
    console.error(error.response.data.message);
    return [];
  }
};

export default API_Profile;
