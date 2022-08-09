import React, { useEffect, useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { Segment, TextArea, Divider } from "semantic-ui-react";
import * as Yup from "yup";

//import axios from "axios";
import { HeaderMessage } from "../components/common/WelcomeMessage";
import { FooterMessage } from "../components/common/WelcomeMessage";
import { rerender } from "../utils/rerender";
function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(true);

  const { email, password } = user;

  /* const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
<<<<<<< HEAD
  }; */

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required"),
  });

  /*  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push("/");
    }
  }, []); */

  const getUser = async () => {
    try {
      const { data } = await axios.get(getUserByTokenUrl, {
        headers: {
          "x-auth-token": localStorage.token,
        },
      });
      setUser(data);
    } catch (error) {
      localStorage.removeItem("token");
      user && errorToast("Session expired");
      setUser(null);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      getUser();
    }
    rerender(render, setRender);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const handleSumbit = async (e) => {
    e.preventDefault();
    const { value, error: err } = validationSchema.validate({
      email,
      password,
    });
    if (err) return setError(err.details[0].message);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/users/signin",
        value
      );
      localStorage.setItem("token", data.token);
      if (!err) setError("");
      data && router.push("/signin");
      getUser();
    } catch (error) {
      error.response && setError(error.response.data.error);
    }
  };

  const login = (username, password) => {
    return fetchWrapper
      .post(`${baseUrl}/signin`, { username, password })
      .then((user) => {
        // publish user to subscribers and store in local storage to stay logged in between page refreshes
        userSubject.next(user);
        localStorage.setItem("user", JSON.stringify(user));

        return user;
      });
  };

  return (
    <>
      <HeaderMessage />
      <Segment>
        <Form
          loading={formLoading}
          error={errorMsg !== null}
          onSubmit={handleSumbit}
        >
          <Message
            error
            header="Oops!"
            content={errorMsg}
            onDismiss={() => {
              setErrorMsg(null);
            }}
          />
          <Form.Input
            label="Email"
            name="email"
            placeholdeR="type you email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fluid
            icon="envelope"
            iconPosition="left"
            type="email"
            required
          />
          <Form.Input
            label="Password"
            name="password"
            placeholdeR="type you password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fluid
            icon={{
              name: "eye",
              circular: true,
              link: true,
              onClick: () => setShowPassword(!showPassword),
            }}
            iconPosition="left"
            type={showPassword ? `text` : "password"}
            required
          />
          <Divider hidden />
          <Button
            content="login"
            type="submit"
            color="orange"
            /*  disabled={submitDisable} */
          />
        </Form>
      </Segment>
      <FooterMessage />
    </>
  );
}
export default Login;
