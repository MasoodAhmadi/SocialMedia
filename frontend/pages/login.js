import axios from "axios";
import * as Yup from "yup";
import { BehaviorSubject } from "rxjs";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { userService } from "../services/user.services";
import { Form, Button, Message } from "semantic-ui-react";
import { Segment, TextArea, Divider } from "semantic-ui-react";
import { HeaderMessage } from "../components/common/WelcomeMessage";
import { FooterMessage } from "../components/common/WelcomeMessage";

function Login() {
  const router = useRouter();
  /*  const [user, setUser] = useState({
    email: "",
    password: "",
  }); */

  const [errorMsg, setErrorMsg] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [submitDisable, setSubmitDisable] = useState(true);
  //const { email, password } = user;

  /* */
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [render, setRender] = useState(0);
  const [password, setPassword] = useState("");
  /*  */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    // redirect to home if already logged in
    if (userService.userValue) {
      router.push("/");
    }
  }, []);

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

  useEffect(() => {
    const isUser = Object.values({ email, password }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisable(false) : setSubmitDisable(true);
  }, [user]);

  const userSubject = new BehaviorSubject(
    process.browser && JSON.parse(localStorage.getItem("user"))
  );

  const login = (username, password) => {
    axios
      .post("http://localhost:8000/api/users/signin", { username, password })
      .then((user) => {
        // publish user to subscribers and store in local storage to stay logged in between page refreshes
        userSubject.next(user);
        localStorage.setItem("user", JSON.stnpmringify(user));

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
            placeholder="type you email"
            value={email}
            onChange={handleChange}
            fluid
            icon="envelope"
            iconPosition="left"
            type="email"
            required
          />
          <Form.Input
            label="Password"
            name="password"
            placeholder="type you password"
            value={password}
            onChange={handleChange}
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
            disabled={submitDisable}
          />
        </Form>
      </Segment>
      <FooterMessage />
    </>
  );
}
export default Login;
