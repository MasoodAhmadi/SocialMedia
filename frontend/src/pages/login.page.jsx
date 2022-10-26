import axios from "axios";
import * as Yup from "yup";
import React, { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import {
  Alert,
  Badge,
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
  const location = useLocation();

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
  let [authMode, setAuthMode] = useState("login");

  const changeAuthMode = () => {
    setAuthMode(authMode === "login" ? "signup" : "login");
  };
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
  if (authMode === "login") {
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
          <br />
          <Row className="mt-2 m-2">
            <Col className="m-0">
              <Alert color="teal" attached>
                <div>
                  <Alert.Heading style={{ width: "", fontSize: "1rem" }}>
                    {authMode === "login" ? "Get started " : "welcome back"}
                  </Alert.Heading>
                </div>
                <Alert.Heading style={{ width: "", fontSize: "1rem" }}>
                  {location.pathname !== "login"
                    ? "Create New Account"
                    : "Login with email and password"}
                </Alert.Heading>
              </Alert>
              <Form
                loading={formLoading}
                error={errorMsg !== null}
                onSubmit={handleSumbit}
              >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Fullname</Form.Label>
                  <Form.Control type="email" placeholder="Enter Fullname" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check type="checkbox" label="Check me out" />
                </Form.Group>
              </Form>
              <FooterMessage
                authMode={authMode}
                changeAuthMode={changeAuthMode}
              />
              <Button> Click Me</Button>
            </Col>
          </Row>
        </Card>
      </Container>
    );
  }
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
            <FooterMessage
              authMode={authMode}
              changeAuthMode={changeAuthMode}
            />
            <Button> Click Me</Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}
