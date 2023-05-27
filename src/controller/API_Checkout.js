import axios from 'axios';

const API_Checkout = async (accessToken, productList) => {
  try {
    const response = await axios.post(
      'https://kodingapp.refillaja.id/user/checkouts',
      {productList},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    // return response.data.invoice_url;
  } catch (error) {
    console.error(error.response.data);
  }
};

export default API_Checkout;
