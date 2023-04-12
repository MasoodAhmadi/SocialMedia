import * as Yup from 'yup';
import { routes } from '../config';
import { useFormik } from 'formik';
import { useTheme } from 'styled-components';
import { useHistory } from 'react-router-dom';
import { unwrapResult } from '@reduxjs/toolkit';
import { Facebook } from 'react-bootstrap-icons';
import { Form, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import authServices from '../services/auth.services';
import { signInUser } from '../redux/slices/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
  FooterMessage,
  HeaderMessage,
} from '../components/common/WelcomeMessage';
import {
  FacebookButton,
  ForgotPasswordButton,
  LoginButton,
  LoginFormContainer,
} from '../styles/identify.styles';

export default function Identification() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { home } = routes;
  const { basic } = useTheme();
  const [authMode, setAuthMode] = useState('identify');
  const { user } = useSelector(({ user }) => user);

  // useEffect(() => {
  //   if (authServices?.getCurrentUser()) history.push(home);
  // }, [user]);

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
    <div>
      <LoginFormContainer>
        <Form onSubmit={formik.handleSubmit}>
          <Row className='mt-4'>
            <Col>
              <HeaderMessage />
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
                  <p className='mt-2' style={{ color: basic.dark }}>
                    {formik.errors.email}
                  </p>
                )}
              </Form.Group>
              <Form.Group className='mb-3' controlId='formBasicPassword'>
                <Form.Label>Password</Form.Label>
                <Form.Control
                  name='password'
                  type='password'
                  placeholder='Enter password'
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
            </Col>
          </Row>

          <Row>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              {' '}
              <LoginButton type='submit'>login</LoginButton>
            </Col>
            <Col xs={6} sm={6} md={6} lg={6} xl={6}>
              {' '}
              <ForgotPasswordButton>forgot password</ForgotPasswordButton>
            </Col>
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
            <FacebookButton>
              {' '}
              <Row>
                {' '}
                <Col xs={9} sm={9} md={9} lg={9} xl={9}>
                  sign in with
                </Col>
                <Col xs={3} sm={3} md={3} lg={3} xl={3}>
                  <Facebook width={22} height={22} />
                </Col>
              </Row>
            </FacebookButton>
          </div>
          <br />
        </Form>
      </LoginFormContainer>
    </div>
  );
}

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
