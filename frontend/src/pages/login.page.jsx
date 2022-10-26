import axios from "axios";
import * as Yup from "yup";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  InputGroup,
  Row,
} from "react-bootstrap";
import {
  FooterMessage,
  HeaderMessage,
} from "../components/common/WelcomeMessage";

export default function Login() {
  const history = useHistory();
  const [errorMsg, setErrorMsg] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  // const [submitDisable, setSubmitDisable] = useState(true);
  const [email, setEmail] = useState("");
  // const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  // const [render, setRender] = useState(0);
  const [password, setPassword] = useState("");

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("email is required"),
    password: Yup.string().required("Password is required"),
  });

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
      data && history.push("/signin");
      //   getUser();
    } catch (error) {
      error.response && setError(error.response.data.error);
    }
  };

  return (
    <Container
      fluid="md"
      className="mt-4 mb-4  d-flex justify-content-center align-items-center"
      style={{ background: "" }}
    >
      <Card
        style={{ width: "22rem", boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px" }}
        className="d-flex justify-content-center align-items-center mt-4 mb-4 m-5"
      >
        <Row className="mt-2">
          <Col>
            <Card.Img
              style={{
                objectFit: "cover",
                objectPosition: "center",
                borderRadius: "50%",
                width: "7rem",
                height: "7rem",
                border: "10px",
                boxShadow: "rgb(0 0 0 / 16%) 1px 1px 10px",
              }}
              circle
              width={100}
              height={100}
              rounded
              alt="profile-image"
              variant="top"
              src="https://images.unsplash.com/photo-1538407476027-5a9866ef5b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
            />
          </Col>
        </Row>
        <br />
        <Row className="mt-2 m-2">
          <Col className="m-0">
            <HeaderMessage />
            <Form
              loading={formLoading}
              error={errorMsg !== null}
              onSubmit={handleSumbit}
            >
              {/* <Alert
                error
                header="Oops!"
                onDismiss={() => {
                  setErrorMsg(null);
                }}
              >
                {errorMsg}adsfasd
              </Alert> */}

              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-4"
              >
                <Form.Control type="email" placeholder="name@example.com" />
              </FloatingLabel>
              <FloatingLabel controlId="floatingPassword" label="Password">
                <Form.Control type="password" placeholder="Password" />
              </FloatingLabel>
              <br />
            </Form>
            <FooterMessage />
            <Button> Click Me</Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
