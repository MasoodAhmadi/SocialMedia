// import ImageDropDiv from '../components/common/imageDropDrag';
import * as Yup from 'yup';
import { useFormik } from 'formik';
// import Button from '../components/common/button';
import { routes } from '../config';
import { useDispatch } from 'react-redux';
import { Card, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import React, { useEffect } from 'react';
import { CheckCircle } from 'react-bootstrap-icons';
import { Col, Form, Row } from 'react-bootstrap';
import Input from '../components/common/Input.component';
import { addUser, loadUser } from '../redux/slices/userSlice';
import { addNotification } from '../redux/slices/addNotificationSlice';
import {
  TextInput,
  ButtonContainer,
  MainContainer,
  InputContainer,
  SignUpText,
} from '../styles/identify.styles';
import { ForgotPassword } from '../styles/identify.styles';
import {
  FooterMessage,
  HeaderMessage,
} from '../components/common/WelcomeMessage';
import { useTheme } from 'styled-components';
import Button from '../components/common/button';
import { StyledLabel } from '../styles/label.styles';

function SignupPage({ changeAuthMode }) {
  const dispatch = useDispatch();
  const { link } = routes;
  const { basic } = useTheme();
  const history = useHistory();
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  const userSchema = Yup.object({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(5, 'Minimum 5 characters').required('Required!'),
    username: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    bio: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      username: '',
      bio: '',
      // showPassword: false,
    },
    validationSchema: userSchema,
    onSubmit: async (values) => {
      try {
        unwrapResult(await dispatch(addUser(values)));
        history.push(link);
        dispatch(
          addNotification({
            identifier: 'user',
            timeout: 5,
            icon: <CheckCircle className='me-2 text-success' />,
            content: `${values.name} welcome`,
          })
        );
      } catch (error) {
        console.error('error: ', error);
        dispatch(
          addNotification({
            identifier: 'user',
            timeout: 5,
            icon: <CheckCircle className='me-2 text-success' />,
            content: `user ${values.email} already exists`,
          })
        );
      }
    },
  });

  return (
    <Container className='p-5'>
      <Row>
        <Col xs={{ span: 12, order: 2 }} md={{ span: 8, order: 1 }}>
          Variable width content
        </Col>
        <Col xs={{ span: 12, order: 1 }} md={{ span: 4, order: 1 }}>
          <div className='d-flex position-relative'>
            <Card>
              <MainContainer>
                <HeaderMessage />
                <Form onSubmit={formik.handleSubmit}>
                  <InputContainer>
                    <div
                      className='mb-3 pb-3 ml-5 top-0 start-0'
                      style={{ marginLeft: '25px' }}
                    >
                      <StyledLabel>Name:</StyledLabel>
                      <Input
                        type='text'
                        name='name'
                        className='mb-5'
                        placeholder='Name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.name && formik.touched.name && (
                        <p className='mt-2' style={{ color: basic.danger }}>
                          {formik.errors.name}
                        </p>
                      )}
                      <StyledLabel className='mt-4'>Email address:</StyledLabel>
                      <Input
                        type='email'
                        name='email'
                        placeholder='Email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.email && formik.touched.email && (
                        <p style={{ color: basic.danger }}>
                          {formik.errors.email}
                        </p>
                      )}
                      {/*  <TextInput className='text-muted'>
                    We'll never share your email with anyone.
                  </TextInput> */}
                      <StyledLabel className='mt-4'>Password:</StyledLabel>
                      <Input
                        placeholder='Password'
                        name='password'
                        autoComplete='new-password'
                        type='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.password && formik.touched.password && (
                        <p className='' style={{ color: basic.danger }}>
                          {formik.errors.password}
                        </p>
                      )}
                      <StyledLabel className='mt-4'>Username:</StyledLabel>

                      <Input
                        type='text'
                        placeholder='Username'
                        name='username'
                        value={formik.values.username}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.username && formik.touched.username && (
                        <p style={{ color: basic.danger }}>
                          {formik.errors.username}
                        </p>
                      )}
                      <StyledLabel className='mt-4'>Bio:</StyledLabel>
                      <Input
                        type='text'
                        placeholder='Bio'
                        name='bio'
                        value={formik.values.bio}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.name && formik.touched.name && (
                        <p style={{ color: basic.danger }}>
                          {formik.errors.name}
                        </p>
                      )}
                      <div className='mt-4'>
                        <ButtonContainer>
                          <Button type='submit' content='Sign up' />
                        </ButtonContainer>
                      </div>

                      <div className=''>
                        <ForgotPassword className='text-center'>
                          Forgot Password ?
                        </ForgotPassword>
                        <SignUpText className='text-center'>
                          Already register!
                          <span
                            className='link-primary'
                            onClick={changeAuthMode}
                          >
                            Sign In
                          </span>
                        </SignUpText>
                      </div>
                    </div>
                  </InputContainer>
                </Form>
              </MainContainer>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default SignupPage;
