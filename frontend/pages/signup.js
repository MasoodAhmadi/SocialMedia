import React, { useState } from "react";
import {
  Form,
  Button,
  Message,
  Segment,
  TextArea,
  Divider,
} from "semantic-ui-react";
import {
  HeaderMessage,
  FooterMessage,
} from "../components/common/WelcomeMessage";

function Signup() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    bio: "",
    facebook: "",
    youtube: "",
    twitter: "",
    instagram: "",
  });

  const { name, email, password, bio } = user;
  const [showSocialLinks, setShowSocialLinks] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [usernameLoading, setUserNameLoading] = useState(false);
  const [usernameAvailable, setUsernameAvailable] = useState(false);
  const handleSumbit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <>
      {" "}
      <HeaderMessage />
      <Form
        loading={formLoading}
        error={errorMsg !== null}
        onSubmit={handleSumbit}
      >
        <Message
          error
          header="Oops!"
          content={errorMsg}
          onDismiss={() => setErrorMsg(null)}
        />

        <Segment>
          <Form.Input
            label="name"
            placeholdeR="Name"
            name="name"
            value={name}
            onChange={handleChange}
            fluid
            icon="user"
            iconPosition="left"
            required
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
        </Segment>
      </Form>
      <FooterMessage />
    </>
  );
}
export default Signup;
