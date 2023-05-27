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
    console.log(response.data.invoice_url);
    return response.data.invoice_url;
  } catch (error) {}
};

export default API_Checkout;
