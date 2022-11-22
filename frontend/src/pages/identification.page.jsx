import axios from 'axios';
import * as Yup from 'yup';
import Joi from 'joi';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Container, Form, Row } from 'react-bootstrap';
import { Alert, Button, Card, Col } from 'react-bootstrap';
import {
  FooterMessage,
  HeaderMessage,
} from '../components/common/WelcomeMessage';
import SocialAppLog from '../components/common/socialmedialogin';
import { UserInfo } from '../redux/slices/userSlice';
import { endPoints } from '../config/endPoints';

export default function Identification() {
  const history = useHistory();
  const location = useLocation();
  const [authMode, setAuthMode] = useState('login');

  const [errorMsg, setErrorMsg] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  // const [showPassword, setShowPassword] = useState(false);
  // const [submitDisable, setSubmitDisable] = useState(true);
  const [email, setEmail] = useState('');
  // const [render, setRender] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [render, setRender] = useState(0);
  const { getallUsers, loginUrl, getUserByTokenUrl } = endPoints;

  var timeout = 0;
  const rerender = () => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      setRender(render + 1);
    }, 60000);
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('email is required'),
    password: Yup.string().required('Password is required'),
  });

  // const changeAuthMode = () => {
  //   setAuthMode(authMode === 'login' ? 'login' : 'signup');
  // };
  /*  */

  // const validationSchema = Joi.object({
  //   email: Joi.string()
  //     .email({ tlds: { allow: false } })
  //     .max(64)
  //     .required(),
  //   password: Joi.string().min(3).max(512).required(),
  // });

  const getUser = async () => {
    try {
      const { data } = await axios.get(getUserByTokenUrl, {
        headers: {
          authorization: localStorage.token,
        },
      });
      setUser(data);
    } catch (error) {
      localStorage.removeItem('token');
      // user && errorToast('Session expired');
      setUser(null);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      getUser();
    }
    rerender(render, setRender);
  }, [render]);

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const { value, error: err } = validationSchema.validate({
        email,
        password,
      });
      console.log(' iam called');
      if (err) return setError(err.details[0].message);
      const { data } = await axios.post(loginUrl, value);
      localStorage.setItem('token', data.token);
      if (!err) setError('');
      data && history.push('/');
      getUser();
      // successToast('Succesfully logged in');
    } catch (error) {
      error.response && setError(error.response.data.error);
      // errorToast(error.response.data.error);
    }
  };

  const handleSumbit = async (e) => {
    e.preventDefault();

    const value = { email, password };
    try {
      const data = await axios.get(getallUsers, value);
      console.log(data);
      localStorage.setItem('token', data.token);
      data && history.push('/');
    } catch (error) {
      error.response && setError(error.response.data.error);
    }
  };
  // if (authMode !== 'login') {
  //   return (
  //     <Container
  //       fluid='md'
  //       className='mt-4 mb-4  d-flex justify-content-center align-items-center'
  //     >
  //       <Card
  //         style={{ width: '25rem', boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 10px' }}
  //         className='d-flex justify-content-center align-items-center mt-4 mb-4 m-5'
  //       >
  //         <br />
  //         <Row className='mt-2 m-2'>
  //           <Col className='m-0'>
  //             <Alert color='teal'>
  //               <div>
  //                 <Alert.Heading style={{ width: '', fontSize: '1rem' }}>
  //                   {authMode !== 'login' ? 'Get started ' : 'welcome back'}
  //                 </Alert.Heading>
  //               </div>
  //               <Alert.Heading style={{ width: '', fontSize: '1rem' }}>
  //                 {authMode !== 'login'
  //                   ? 'Create New Account'
  //                   : 'Login with email and password'}
  //               </Alert.Heading>
  //             </Alert>
  //             <Alert>sign up</Alert>
  //             <Form>
  //               <Form.Group className='mb-3' controlId='formBasicEmail'>
  //                 <Form.Label>Full name</Form.Label>
  //                 <Form.Control type='email' placeholder='Enter Full name' />
  //               </Form.Group>
  //               <Form.Group className='mb-3' controlId='formBasicEmail'>
  //                 <Form.Label>Email address</Form.Label>
  //                 <Form.Control type='email' placeholder='Enter email' />
  //                 <Form.Text className='text-muted'>
  //                   We'll never share your email with anyone.
  //                 </Form.Text>
  //               </Form.Group>

  //               <Form.Group className='mb-3' controlId='formBasicPassword'>
  //                 <Form.Label>Password</Form.Label>
  //                 <Form.Control type='password' placeholder='Password' />
  //               </Form.Group>
  //               <Form.Group className='mb-3' controlId='formBasicCheckbox'>
  //                 <Form.Check type='checkbox' label='Check me out' />
  //               </Form.Group>
  //             </Form>
  //             <FooterMessage
  //               authMode={authMode}
  //               // changeAuthMode={changeAuthMode}
  //             />

  //             <Button onClick={() => history.push('/')}> create</Button>
  //             <Button className='m-1'>forgot password</Button>
  //           </Col>
  //         </Row>
  //       </Card>
  //     </Container>
  //   );
  // }
  return (
    <Container
      fluid='md'
      className='mt-4 mb-4  d-flex justify-content-center align-items-center'
      style={{ background: '' }}
    >
      <Card
        style={{ width: '22rem', boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 10px' }}
        className='d-flex justify-content-center align-items-center mt-4 mb-4 m-5'
      >
        <Row className='mt-2'>
          <Col>
            <Card.Img
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
                borderRadius: '50%',
                width: '7rem',
                height: '7rem',
                border: '50px',
                // position:"absolute",
                boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 10px black',
              }}
              width={100}
              height={100}
              alt='profile-image'
              variant='top'
              // src='https://images.unsplash.com/photo-1538407476027-5a9866ef5b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
            />
          </Col>
        </Row>
        <br />
        <Row className='mt-2 m-2'>
          <Col className='m-0'>
            <HeaderMessage />
            <Form
            // loading={formLoading}
            // error={errorMsg !== null}
            // onSubmit={onLogin}
            >
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type='email'
                  value={email}
                  placeholder='Enter email'
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone.
                </Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type='password'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>

              <br />
            </Form>
            <FooterMessage
              authMode={authMode}
              // changeAuthMode={changeAuthMode}
            />

            <Button onClick={handleSumbit}>login</Button>
            <Button className='m-1'>forgot password</Button>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <SocialAppLog />
          </Col>
        </Row>
        <br />
      </Card>
    </Container>
  );
}
