import React, { useEffect, useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
import { Segment, TextArea, Divider } from "semantic-ui-react";

//import axios from "axios";
import { HeaderMessage } from "../components/common/WelcomeMessage";
import { FooterMessage } from "../components/common/WelcomeMessage";

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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const isUser = Object.values({ email, password }).every((item) =>
      Boolean(item)
    );
    isUser ? setSubmitDisable(false) : setSubmitDisable(true);
  }, [user]);

  const handleSumbit = (e) => {
    e.preventDefault();
  };

  const login = (username, password) => {
    return fetchWrapper
      .post(`${baseUrl}/authenticate`, { username, password })
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
            placeholdeR="type you password"
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
