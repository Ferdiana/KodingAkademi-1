import axios from 'axios';

const register = async (
  full_name,
  email,
  phone_number,
  password,
  confirmPassword,
) => {
  try {
    const response = await axios.post(
      'https://kodingapp.refillaja.id/register',
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
    throw error;
  }
};

export {register};
