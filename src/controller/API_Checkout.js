import axios from 'axios';

const API_Checkout = async (accessToken, productLists) => {
  try {
    const response = await axios.post(
      'https://kodingapp.refillaja.id/user/checkouts',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        data: {productLists},
      },
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export default API_Checkout;
