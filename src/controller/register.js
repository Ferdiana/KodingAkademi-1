import axios from 'axios';
import {API_KEY} from '@env';

const register = async (
  full_name,
  email,
  phone_number,
  password,
  confirmPassword,
) => {
  try {
    const response = await axios.post(
      'https://2358-103-157-49-64.ngrok-free.app/register',
      {
        full_name,
        email,
        phone_number,
        password,
        confirmPassword,
      },
    );
    console.log(response.data);
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export {register};
