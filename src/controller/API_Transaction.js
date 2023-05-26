import axios from 'axios';

const API_Transaction = async accessToken => {
  try {
    const response = await axios.get(
      'https://kodingapp.refillaja.id/user/orders',
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

export default API_Transaction;
