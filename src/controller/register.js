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
      'https://9b0b-103-157-49-76.ngrok-free.app/register',
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
