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
    return response.data.invoice_url;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const API_CheckoutWithCoupon = async (
  accessToken,
  productList,
  selectedCoupon,
) => {
  try {
    const response = await axios.post(
      `https://kodingapp.refillaja.id/user/checkouts?couponId=${selectedCoupon}`,
      {productList},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.invoice_url;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export {API_Checkout, API_CheckoutWithCoupon};
