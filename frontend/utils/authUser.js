import axios from "axios";
import Router from "next/router";
import cookie from "js-cookie";
import catchErrors from "./catchErrors";

export const registerUser = async (
  user,
  username,
  firstname,
  bio,
  email,
  password,
  profilePicUrl,
  setError,
  setLoading
) => {
  setLoading(true);
  try {
    const res = await axios.post(`http://localhost:8000/api/users/addprofile`, {
      username,
      firstname,
      bio,
      email,
      password,
      profilePicUrl,
    });
    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
};
export const LoginUser = async (
  username,
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
      password,
    });
    setToken(res.data);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
};

const setToken = (token) => {
  cookie.set("token", token);
  Router.push("/addprofile");
};
