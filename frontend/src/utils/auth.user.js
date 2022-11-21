import axios from 'axios';
import Router from 'next/router';
import cookie from 'js-cookie';
import catchErrors from './catchErrors';

export const registerUser = async (
  setError,
  username,
  firstname,
  bio,
  email,
  password,
  profilePicUrl
) => {
  try {
    const res = await axios.post(
      `http://localhost:8000/api/users/addprofile`,
      {
        username,
        firstname,
        bio,
        email,
        password,
        profilePicUrl,
      },
      {
        headers: {
          'Content-type': 'multipart/form-data',
        },
        form: true,
      }
    );
    setToken(res.data);
  } catch (error) {
    console.log('something happened!');
  }
};

export const LoginUser = async (
  username,
  user,
  email,
  password,
  setError,
  setLoading
) => {
  setLoading(true);
  try {
    const res = await axios.post(`http://localhost:8000/api/users/auth`, {
      username,
      email,
      user,
      password,
    });

    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
};

const setToken = (token) => {
  cookie.set('token', token);
  Router.push('/');
};
