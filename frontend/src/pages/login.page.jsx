import axios from "axios";
import * as Yup from "yup";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
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
    <Container className="mt-4 mb-4" style={{ background: "red" }}>
      <Row>
        <Col xs={8}>
          <HeaderMessage />
          <Form
            loading={formLoading}
            error={errorMsg !== null}
            onSubmit={handleSumbit}
          >
            <Alert
              error
              header="Oops!"
              content={errorMsg}
              onDismiss={() => {
                setErrorMsg(null);
              }}
            />
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
              <Form.Control
                placeholder="Username"
                aria-label="Username"
                aria-describedby="basic-addon1"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <InputGroup.Text id="basic-addon2">
                @example.comdddd
              </InputGroup.Text>
            </InputGroup>

            <Form.Label htmlFor="basic-url">Your vanity URL</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">
                https://example.com/users/
              </InputGroup.Text>
              <Form.Control id="basic-url" aria-describedby="basic-addon3" />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>$</InputGroup.Text>
              <Form.Control aria-label="Amount (to the nearest dollar)" />
              <InputGroup.Text>.00</InputGroup.Text>
            </InputGroup>

            <InputGroup>
              <InputGroup.Text>With textarea</InputGroup.Text>
              <Form.Control as="textarea" aria-label="With textarea" />
            </InputGroup>
            <FooterMessage />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
