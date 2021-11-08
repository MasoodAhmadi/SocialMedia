import React from "react";
import axios from "axios";
import {
  HeaderMessage,
  FooterMessage,
} from "../components/common/WelcomeMessage";

function Login() {
  return (
    /*  <button
      onClick={async () => {
        await axios.post("/users/addusers", {
          firstName: "masood",
          lastName: "ahmadi",
        });
      }}
    >
      click
    </button> */
    <>
      <HeaderMessage />
      <FooterMessage />
    </>
  );
}
export default Login;
