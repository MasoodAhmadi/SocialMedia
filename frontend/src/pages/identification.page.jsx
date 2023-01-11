import * as Yup from 'yup';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Row } from 'react-bootstrap';
import { Button, Card, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';

import { FooterMessage } from '../components/common/WelcomeMessage';
import { HeaderMessage } from '../components/common/WelcomeMessage';
import SocialAppLog from '../components/common/socialmedialogin';
import { signInUser } from '../redux/slices/userSlice';
import { routes } from '../config';
import { authServices } from '../services/auth.services';
export default function Identification() {
  const [authMode, setAuthMode] = useState('login');
  const history = useHistory();
  const dispatch = useDispatch();

  const { home, identify, users } = routes;

  const [errorMsg, setErrorMsg] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [email, setEmail] = useState('');
  // const [render, setRender] = useState(0);
  // const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState('');
  const { user } = useSelector((user) => user);

  /*   const { getallUsers, loginUrl, getUserByTokenUrl } = endPoints;
   */
  useEffect(() => {
    if (authServices?.getCurrentUser()) history.push(home);
  }, [user]);

  const userSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Required!'),
    password: Yup.string().min(5, 'Minimum 5 characters').required('Required!'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        unwrapResult(await dispatch(signInUser(values)));
        history.push(home);
        /*  dispatch(
          addNotification({
            timeout: 5,
            identifier: 'user',
            icon: <Unlock size={25} className='me-2 text-success' />,
            content: 'login successfull',
          })
        ); */
      } catch (error) {
        /*  dispatch(
          addNotification({
            timeout: 5,
            identifier: 'user',
            icon: (
              <ExclamationCircle size={25} className='me-2' color={primary} />
            ),
            content: error?.message,
          })
        ); */
        console.log('error: ', error);
      }
    },
  });
  return (
    <Container
      fluid='md'
      className='mt-4 mb-4  d-flex justify-content-center align-items-center'
      style={{ background: '' }}>
      <Card
        style={{ width: '22rem', boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 10px' }}
        className='d-flex justify-content-center align-items-center mt-4 mb-4 m-5'>
        {/*  <Row className='mt-2'>
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
              src='https://images.unsplash.com/photo-1538407476027-5a9866ef5b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
            />
          </Col>
        </Row>
        <br /> */}
        <Row className='mt-2 m-2'>
          <Col className='m-0'>
            <HeaderMessage />
            <Form
              onSubmit={formik.handleSubmit}
              // loading={formLoading}
              // error={errorMsg !== null}
              // onSubmit={onLogin}
            >
              <Form.Group className='mb-3' controlId='formBasicEmail'>
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  name='email'
                  type='email'
                  placeholder='Enter email'
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                <Form.Text className='text-muted'>
                  We'll never share your email with anyone.
                </Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name='password'
                  type='password'
                  placeholder='Password'
                  value={formik.values.password}
                  onChange={formik.handleChange}
									aria-label='Password for access admin'

                />
              </Form.Group>

              <br />
            </Form>
            <FooterMessage
            /* authMode={authMode} */
            />

            <Button type='submit'>Login</Button>
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
