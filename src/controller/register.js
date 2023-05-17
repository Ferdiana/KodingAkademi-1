import axios from 'axios';
import {API_URL, API_KEY} from '@env';

const register = async (
  full_name,
  email,
  phone_number,
  password,
  confirmPassword,
) => {
  try {
    const response = await axios.post(`${API_KEY}/register`, {
      full_name,
      email,
      phone_number,
      password,
      confirmPassword,
    });
    console.log(response.data);
  } catch (error) {
    console.log(error.response.data.message);
  }
};

export {register};
