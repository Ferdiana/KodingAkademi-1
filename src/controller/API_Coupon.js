import axios from 'axios';

const API_Coupon = async (accessToken, productId) => {
  try {
    const response = await axios.get(
      `https://kodingapp.refillaja.id/user/coupons?products=${productId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );
    return response.data.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export default API_Coupon;
