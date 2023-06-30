import * as Yup from 'yup';
import { useFormik } from 'formik';
import { routes } from '../config';
import { useTheme } from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { UnlockFill } from 'react-bootstrap-icons';
import { Form, Row, Col, Container, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import authServices from '../services/auth.services';
import { loadUser, signInUser } from '../redux/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useWindowSize } from '../hooks/';
import {
  FooterMessage,
  HeaderMessage,
} from '../components/common/WelcomeMessage';
import { addNotification } from '../redux/slices/addNotificationSlice';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/button';
import Input from '../components/common/Input.component';
import Icon from '../components/common/Icon.component';

import {
  ButtonContainer,
  ForgotPassword,
  HorizontalRule,
  IconsContainer,
  InputContainer,
  LoginWith,
  MainContainer,
  SignUpText,
  StyledLabel,
  TextInput,
} from '../styles';

export default function Identification({ changeAuthMode, authMode }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t: localize, i18n } = useTranslation();
  const { home } = routes;
  const { basic } = useTheme();
  const { user } = useSelector((state) => state.user);
  console.log('user', user);
  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);

  useEffect(() => {
    if (authServices.getCurrentUser()) history.push(home);
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
        const response = unwrapResult(await dispatch(signInUser(values)));
        history.push(home);
        dispatch(
          addNotification({
            identifier: 'user',
            timeout: 5,
            icon: <UnlockFill className='text-success' />,
            content: response?.username
              ? `${localize('Welcome')} ${response?.username}`
              : localize('Welcome'),
          })
        );
      } catch (error) {
        console.log('error: ', error);
      }
    },
  });

  const FacebookBackground =
    'linear-gradient(to right, #0546A0 0%, #0546A0 40%, #663FB6 100%)';
  const InstagramBackground =
    'linear-gradient(to right, #A12AC4 0%, #ED586C 40%, #F0A853 100%)';
  const TwitterBackground =
    'linear-gradient(to right, #56C1E1 0%, #35A9CE 50%)';
  return (
    <Container className='p-5'>
      <Row className=''>
        <Col xs={{ span: 12, order: 2 }} md={{ span: 8, order: 1 }}>
          Variable width content
        </Col>
        <Col xs={{ span: 12, order: 1 }} md={{ span: 4, order: 1 }}>
          <div className='d-flex position-relative'>
            <Card>
              <MainContainer>
                <HeaderMessage />
                <Form onSubmit={formik.handleSubmit}>
                  <InputContainer className=''>
                    <div
                      className='mb-3 pb-3 ml-5 top-0 start-0'
                      style={{ marginLeft: '25px' }}
                    >
                      <StyledLabel>Email address:</StyledLabel>
                      <Input
                        type='email'
                        name='email'
                        placeholder='Email'
                        className='mb-0'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                      />
                      <TextInput className='text-muted'>
                        We'll never share your email with anyone.
                      </TextInput>
                      {formik.errors.email && formik.touched.email && (
                        <p className='mt-2' style={{ color: basic.danger }}>
                          {formik.errors.email}
                        </p>
                      )}

                      <StyledLabel className='mt-0'>Password:</StyledLabel>
                      <Input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={formik.values.password}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.password && formik.touched.password && (
                        <p className='mt-2' style={{ color: basic.danger }}>
                          {formik.errors.password}
                        </p>
                      )}
                    </div>
                  </InputContainer>
                  <ButtonContainer>
                    <Button type='submit' content='Sign in' />
                  </ButtonContainer>
                  <LoginWith>OR LOGIN WITH</LoginWith>
                  <HorizontalRule />
                  <IconsContainer>
                    <Icon color={FacebookBackground}>
                      <FaFacebookF />
                    </Icon>
                    <Icon color={InstagramBackground}>
                      <FaInstagram />
                    </Icon>
                    <Icon color={TwitterBackground}>
                      <FaTwitter />
                    </Icon>
                  </IconsContainer>
                  <div className=''>
                    <ForgotPassword className='text-center'>
                      <a href=''>Forgot Password ?</a>
                    </ForgotPassword>
                    <SignUpText className='text-center'>
                      Not registered yet?
                      <span className='link-primary' onClick={changeAuthMode}>
                        Sign Up
                      </span>
                    </SignUpText>
                  </div>
                </Form>
              </MainContainer>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
