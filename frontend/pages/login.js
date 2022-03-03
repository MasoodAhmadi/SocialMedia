import React, { useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";

//import axios from "axios";
import { HeaderMessage } from "../components/common/WelcomeMessage";
import { FooterMessage } from "../components/common/WelcomeMessage";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { name, email, password, bio } = user;

  return (
    <>
      <HeaderMessage />
      <FooterMessage />
    </>
  );
}
export default Login;
