import { routes } from '../config';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import authServices from '../services/auth.services';
import { Footer, Navbars } from '../components';

export default function homePage() {
  const { home } = routes;
  const { user } = useSelector(({ user }) => user);
  const history = useHistory();
  useEffect(() => {
    if (authServices.getCurrentUser()) history.push(home);
  }, [user]);
  return (
    <>
      {/* <Navbars /> */}
      <div className='m-1 mt-4 pt-5'>
        <Container>homepage</Container>
        {/* <Footer /> */}
      </div>
    </>
  );
}
