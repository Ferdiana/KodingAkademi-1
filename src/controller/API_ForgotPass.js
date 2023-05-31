import axios from 'axios';

const API_ForgotPassword = async email => {
  try {
    await axios.post('https://kodingapp.refillaja.id/forgot-password', {
      email,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {API_ForgotPassword};
