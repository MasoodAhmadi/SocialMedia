import * as Yup from 'yup';
import { routes } from '../config';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useTheme } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { Form, Row, Col } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { signInUser } from '../redux/slices/userSlice';

import { PersonBoundingBox, ShieldLock, Unlock } from 'react-bootstrap-icons';
import { LoginButton, LoginFormContainer, LoginInputField } from '../assets';
import authServices from '../services/auth.services';

export default function Identification() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { home } = routes;
  const { basic } = useTheme();
  const { user } = useSelector(({ user }) => user);

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
      } catch (error) {
        console.log('error: ', error);
      }
    },
  });
  return (
    <LoginFormContainer>
      {' '}
      <Form onSubmit={formik.handleSubmit}>
        <Row className='pe-5 ps-5 mt-5'>
          <Col xs={1} sm={1} md={1} lg={1} xl={1}>
            <PersonBoundingBox
              width={22}
              height={22}
              className='mt-2'
              color={`${basic.bright}80`}
            />
            asdfasdf
          </Col>
          <Col xs={11} sm={11} md={11} lg={11} xl={11}>
            <LoginInputField
              name='email'
              type='email'
              placeholder='enter email'
              value={formik.values.email}
              onChange={formik.handleChange}
              aria-label='Email for access admin'
            />
          </Col>
          {formik.errors.email && formik.touched.email && (
            <p className='mt-2' style={{ color: basic.bright }}>
              {formik.errors.email}
            </p>
          )}
        </Row>
        <Row className='pe-5 ps-5 mt-4'>
          <Col xs={1} sm={1} md={1} lg={1} xl={1}>
            <ShieldLock
              width={24}
              height={24}
              className='mt-2'
              color={`${basic.bright}80`}
            />
          </Col>
          <Col xs={11} sm={11} md={11} lg={11} xl={11}>
            <LoginInputField
              name='password'
              type='password'
              placeholder='enter password'
              value={formik.values.password}
              onChange={formik.handleChange}
              aria-label='Password for access admin'
            />
          </Col>
          {formik.errors.password && formik.touched.password && (
            <p className='mt-2' style={{ color: basic.bright }}>
              {formik.errors.password}
            </p>
          )}
        </Row>
        <div className='d-flex flex-direction-column align-items-center justify-content-center mb-5'>
          <LoginButton type='submit'>login</LoginButton>
        </div>
      </Form>
    </LoginFormContainer>
    /* 
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
        <br />
        <Row className='mt-2 m-2'>
          <Col className='m-0'>
            <HeaderMessage />
            <Form onSubmit={formik.handleSubmit}>
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
                {formik.errors.email && formik.touched.email && (
                  <p className='mt-2' style={{ color: basic.bright }}>
                    {formik.errors.email}
                  </p>
                )}
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
                {formik.errors.password && formik.touched.password && (
                  <p className='' style={{ color: 'black' }}>
                    {formik.errors.password}
                  </p>
                )}
              </Form.Group>

              <br />
            </Form>
            <FooterMessage authMode={authMode} />

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
		*/
  );
}
