import * as Yup from 'yup';
import { useFormik } from 'formik';
import { routes } from '../config';
import { useTheme } from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { Facebook, Google, UnlockFill } from 'react-bootstrap-icons';
import { Form, Row, Col, Container, Card } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import authServices from '../services/auth.services';
import { loadUser, signInUser } from '../redux/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

import {
  FooterMessage,
  HeaderMessage,
} from '../components/common/WelcomeMessage';
import {
  FacebookButton,
  ForgotPasswordButton,
  GoogleButton,
  LoginButton,
  LoginFormContainer,
} from '../styles/identify.styles';
import { addNotification } from '../redux/slices/addNotificationSlice';
import { useTranslation } from 'react-i18next';
import Button from '../components/common/button';
import Input from '../components/common/Input.component';
import Icon from '../components/common/Icon.component';

export default function Identification() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t: localize, i18n } = useTranslation();

  const { link } = routes;
  const { basic } = useTheme();
  const [authMode, setAuthMode] = useState('identify');
  const { user } = useSelector(({ user }) => user);

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  useEffect(() => {
    if (authServices.getCurrentUser()) history.push(link);
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
        history.push(link);
        dispatch(
          addNotification({
            identifier: 'user',
            timeout: 5,
            icon: <UnlockFill className='text-success' />,
            content: response?.name
              ? `${localize('Welcome')} ${response?.name}`
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
        <Col></Col>
        <Col>Variable width content</Col>
        <Col>
          <MainContainer>
            {/* <LoginCard> */}
            <HeaderMessage />
            <Form onSubmit={formik.handleSubmit}>
              <InputContainer>
                <Input
                  type='email'
                  name='email'
                  placeholder='Email'
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
              <ForgotPassword>Forgot Password ?</ForgotPassword>
            </Form>
            <FooterMessage authMode={authMode} />
          </MainContainer>
          {/* </LoginCard> */}
        </Col>
      </Row>
      {/* <LoginFormContainer>
          
          
       
          </Row>
          <br />
          <Row>
            <Col>
              <FooterMessage authMode={authMode} />
            </Col>
          </Row>
          <div>
            <FacebookButton>
              <Row>
                <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                  sign in with
                </Col>
                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Facebook width={22} height={22} />
                </Col>
              </Row>
            </FacebookButton>
            <GoogleButton>
              {' '}
              <Row>
                {' '}
                <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                  sign in with
                </Col>
                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Google width={22} height={22} />
                </Col>
              </Row>
            </GoogleButton>
          </div>
          <br />
        </Form>
      </LoginFormContainer> */}
    </Container>
  );
}

const TextInput = styled.p`
  color: black;
  text-transform: lowercase;
  display: flex;
  align-items: center;
`;
const MainContainer = styled.div`
  // display: flex;
  align-items: center;
  // justify-content: center;
  flex-direction: column;
  height: 80vh;
  width: 20vw;
  background: rgba(255, 255, 255, 0.15);
  box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border-radius: 10px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  @media only screen and (max-width: 320px) {
    width: 80vw;
    height: 60vh;
    hr {
      margin-bottom: 0.3rem;
    }
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 360px) {
    width: 80vw;
    height: 87vh;
    h4 {
      font-size: small;
    }
  }
  @media only screen and (min-width: 411px) {
    width: 80vw;
    height: 60vh;
  }

  @media only screen and (min-width: 768px) {
    width: 80vw;
    height: 60vh;
  }
  @media only screen and (min-width: 1024px) {
    width: 60vw;
    height: 60vh;
  }
  @media only screen and (min-width: 1280px) {
    width: 30vw;
    height: 61vh;
  }
`;

const WelcomeText = styled.h2`
  margin: 3rem 0 2rem 0;
  color: black;
`;

const InputContainer = styled.div`
  display: flex;
  // margin: 10px;
  padding-top: 5rem;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 20%;
  width: 100%;
`;

const ButtonContainer = styled.div`
  margin: 1rem 0 2rem 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginWith = styled.p`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
`;

const HorizontalRule = styled.hr`
  width: 100%;
  height: 0.3rem;
  border-radius: 0.8rem;
  border: none;
  background: linear-gradient(to right, #14163c 0%, #03217b 79%);
  background-color: #ebd0d0;
  margin: 1.5rem 0 1rem 0;
  backdrop-filter: blur(25px);
`;

const IconsContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 2rem 0 3rem 0;
  width: 100%;
`;

const ForgotPassword = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
`;

// <Container
//   fluid='md'
//   className='mt-4 mb-4  d-flex justify-content-center align-items-center'
//   style={{ background: '' }}
// >
//   <Card
//     style={{ width: '22rem', boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 10px' }}
//     className='d-flex justify-content-center align-items-center mt-4 mb-4 m-5'
//   >
//     <Row className='mt-2'>
//       <Col>
//         <Card.Img
//           style={{
//             objectFit: 'cover',
//             objectPosition: 'center',
//             borderRadius: '50%',
//             width: '7rem',
//             height: '7rem',
//             border: '50px',
//             boxShadow: 'rgb(0 0 0 / 16%) 1px 1px 10px black',
//           }}
//           width={100}
//           height={100}
//           alt='profile-image'
//           variant='top'
//           src='https://images.unsplash.com/photo-1538407476027-5a9866ef5b39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80'
//         />
//       </Col>
//     </Row>
//     <br />
//     <Row className='mt-2 m-2'>
//       <Col className='m-0'>
//         <HeaderMessage />
//         <Form onSubmit={formik.handleSubmit}>
//           <Form.Group className='mb-3' controlId='formBasicEmail'>
//             <Form.Label>Email address</Form.Label>
//             <Form.Control
//               name='email'
//               type='email'
//               placeholder='Enter email'
//               value={formik.values.email}
//               onChange={formik.handleChange}
//             />
//             <Form.Text className='text-muted'>
//               We'll never share your email with anyone.
//             </Form.Text>
//             {formik.errors.email && formik.touched.email && (
//               <p className='mt-2' style={{ color: basic.bright }}>
//                 {formik.errors.email}
//               </p>
//             )}
//           </Form.Group>
//           <Form.Group className='mb-3' controlId='formBasicPassword'>
//             <Form.Label>Password</Form.Label>
//             <Form.Control
//               name='password'
//               type='password'
//               placeholder='Password'
//               value={formik.values.password}
//               onChange={formik.handleChange}
//               aria-label='Password for access admin'
//             />
//             {formik.errors.password && formik.touched.password && (
//               <p className='' style={{ color: 'black' }}>
//                 {formik.errors.password}
//               </p>
//             )}
//           </Form.Group>

//           <br />
//         </Form>
//         <FooterMessage authMode={authMode} />

//         <Button type='submit'>Login</Button>
//         <Button className='m-1'>forgot password</Button>
//       </Col>
//     </Row>
//     <br />
//     <Row>
//       <Col>
//         <SocialAppLog />
//       </Col>
//     </Row>
//     <br />
//   </Card>
// </Container>
